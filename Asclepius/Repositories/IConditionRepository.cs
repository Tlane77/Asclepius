using Asclepius.Models;
using System.Collections.Generic;

namespace Asclepius.Repositories
{
    public interface IConditionRepository
    {
       
        List<Condition> GetAllConditions();
        Condition GetConditionById(int id);
        void Add(Condition condition);

        void Update(Condition condition);

        void DeleteCondition(int id);

        List<Condition> GetAllUserConditions(int UPID);
    }
}