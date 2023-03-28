using Camille.Enums;
using Camille.RiotGames;
using Camille.RiotGames.LeagueV4;
using Camille.RiotGames.MatchV5;
using Camille.RiotGames.SummonerV4;
using LeagueAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LeagueAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SummonerController : ControllerBase
    {
        private readonly ILogger<SummonerController> _logger;
        private readonly RiotGamesApi _api;

        public SummonerController(ILogger<SummonerController> logger, IConfiguration config)
        {
            var apiKey = config.GetValue<string>("ApiKey");

            _logger = logger;
            _api = RiotGamesApi.NewInstance(apiKey);
        }

        [HttpGet("basic-info", Name = nameof(GetBasicInfo))]
        public async Task<ActionResult<Summoner>> GetBasicInfo([FromQuery] SummonerSearchInfoDto dto)
        {
            var region = dto.PlatformRoute;
            var summoner = await _api.SummonerV4().GetBySummonerNameAsync(region, dto.SummonerName).ConfigureAwait(false);

            if (summoner is null)
                return NotFound($"Summoner name \"${dto.SummonerName}\" was not found in region {region}");

            return Ok(summoner);
        }

        [HttpGet("match-history", Name = nameof(GetMatchHistory))]
        public async Task<ActionResult<IEnumerable<Match>>> GetMatchHistory([FromQuery] SummonerSearchInfoDto dto, [FromQuery] int page = 0)
        {
            var region = dto.PlatformRoute;
            var summoner = await _api.SummonerV4().GetBySummonerNameAsync(region, dto.SummonerName).ConfigureAwait(false);

            if (summoner is null)
                return NotFound($"Summoner name \"${dto.SummonerName}\" was not found in region {region}");

            var pageSize = 5;
            var matchIds = await _api.MatchV5().GetMatchIdsByPUUIDAsync(region.ToRegional(), summoner.Puuid, start: page * pageSize, count: pageSize).ConfigureAwait(false);
            var matches = new List<Match>();

            foreach (var matchId in matchIds)
            {
                var result = await _api.MatchV5().GetMatchAsync(region.ToRegional(), matchId).ConfigureAwait(false);

                if (result is not null)
                    matches.Add(result);
            }

            return Ok(matches);
        }

        [HttpGet("ranking", Name = nameof(GetRanking))]
        public async Task<ActionResult<LeagueEntry[]>> GetRanking([FromQuery] SummonerSearchInfoDto dto)
        {
            var region = dto.PlatformRoute;
            var summoner = await _api.SummonerV4().GetBySummonerNameAsync(region, dto.SummonerName).ConfigureAwait(false);

            if (summoner is null)
                return NotFound($"Summoner name \"${dto.SummonerName}\" was not found in region {region}");

            var ranking = await _api.LeagueV4().GetLeagueEntriesForSummonerAsync(region, summoner.Id).ConfigureAwait(false);
            return Ok(ranking);
        }

        [HttpGet("top-champions", Name = nameof(GetTopChampions))]
        public async Task<ActionResult<ChampionMasteryDto[]>> GetTopChampions([FromQuery] SummonerSearchInfoDto dto)
        {
            var region = dto.PlatformRoute;
            var summoner = await _api.SummonerV4().GetBySummonerNameAsync(region, dto.SummonerName).ConfigureAwait(false);

            if (summoner is null)
                return NotFound($"Summoner name \"${dto.SummonerName}\" was not found in region {region}");

            var champions = await _api.ChampionMasteryV4().GetAllChampionMasteriesAsync(region, summoner.Id).ConfigureAwait(false);
            var championsDto = champions.Select(x => x?.ToChampionMasteryDto() ?? new ChampionMasteryDto());

            return Ok(championsDto);
        }

        [HttpGet("regions", Name = nameof(GetAvailableRegions))]
        public async Task<ActionResult<string[]>> GetAvailableRegions()
        {
            return Ok(Enum.GetNames(typeof(PlatformRoute)));
        }
    }
}