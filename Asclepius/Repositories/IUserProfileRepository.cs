using Asclepius.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asclepius.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        void UpdateUserProfile(UserProfile userProfile);
        List<UserProfile> GetAllActive();
        List<UserProfile> GetAllInactive();
    }
}
