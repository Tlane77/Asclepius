using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Asclepius.Repositories;
using Asclepius.Models;
using Asclepius.Utils;
using Microsoft.Data.SqlClient;
using System.Web;

namespace Asclepius.Repositories
{
    public class ConditionRepository : BaseRepository
    {
        public ConditionRepository(IConfiguration configuration) : base(configuration) { }



    }
}





