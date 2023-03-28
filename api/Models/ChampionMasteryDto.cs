using Camille.RiotGames.ChampionMasteryV4;
using Microsoft.OpenApi.Extensions;
using System.ComponentModel.DataAnnotations;

namespace LeagueAPI.Models
{
    public class ChampionMasteryDto
    {
        public ChampionMastery MasteryInfo { get; set; }
        public string ChampionName { get; set; }
    }

    public static class ChampionMasteryDtoConverter
    {
        public static ChampionMasteryDto ToChampionMasteryDto(this ChampionMastery mastery)
        {
            var championName = (int)mastery.ChampionId != 902 ? mastery.ChampionId.GetAttributeOfType<DisplayAttribute>().GetDescription() : "Milio";

            return new ChampionMasteryDto()
            {
                MasteryInfo = mastery,
                ChampionName = championName,
            };
        }
    }
}
