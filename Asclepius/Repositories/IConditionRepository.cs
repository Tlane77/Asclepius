using Asclepius.Models;
using System.Collections.Generic;

namespace Asclepius.Repositories
{
    public interface IConditionRepository
    {
        List<Condition> GetAllConditions();
    }
}