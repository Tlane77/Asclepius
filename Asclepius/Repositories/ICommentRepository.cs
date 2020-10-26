using Asclepius.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asclepius.Repositories
{
    
        public interface ICommentRepository
        {
            void Add(Comment comment);
            void Delete(int id);
            List<Comment> GetAllComments();
            List<Comment> GetCommentsByConditionId(int commentId);

            Comment GetCommentById(int commentId);
            void Update(Comment comment);
        }
    }

