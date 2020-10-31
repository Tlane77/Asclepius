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
    public class ConditionRepository : BaseRepository, IConditionRepository
    {
        public ConditionRepository(IConfiguration configuration) : base(configuration) { }

         public List<Condition> GetAllConditions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT c.Id, c.Title, c.Content, c.ImageLocation, c.CreateDateTime,
                                         c.CategoryId, c.UserProfileId,
                                         up.FirstName AS AuthorFirstName, up.LastName AS AuthorLastName,
                                         cat.Name AS CategoryName
                                         FROM Condition c
                                         LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                                         LEFT JOIN Category cat ON c.CategoryId = cat.Id
                                        
                                         ORDER BY CreateDateTime DESC;";

                    

                    var reader = cmd.ExecuteReader();

                    var conditions = new List<Condition>();
                    while (reader.Read())
                    {
                        conditions.Add(new Condition()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                LastName = DbUtils.GetString(reader, "AuthorLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return conditions;
                }
            }
        }

        public List<Condition> GetAllUserConditions(int UPID)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT c.Id, c.Title, c.Content, c.ImageLocation, c.CreateDateTime,
                                          c.CategoryId, c.UserProfileId,
                                         up.FirstName AS AuthorFirstName, up.LastName AS AuthorLastName,
                                         c.Name AS CategoryName
                                         FROM Condition c
                                         LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                         LEFT JOIN Category c on p.CategoryId = c.Id
                                         WHERE p.UserProfileId = @UPID
                                         ORDER BY createDateTime DESC;";

                    DbUtils.AddParameter(cmd, "@UPID", UPID);

                    var reader = cmd.ExecuteReader();

                    var conditions = new List<Condition>();
                    while (reader.Read())
                    {
                        conditions.Add(new Condition()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                LastName = DbUtils.GetString(reader, "AuthorLastName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        });
                    }

                    reader.Close();

                    return conditions;
                }
            }
        }


        public Condition GetConditionById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                         SELECT c.Id, c.Title, c.Content, c.ImageLocation, c.CreateDateTime,
                                          c.CategoryId, c.UserProfileId,
                                         up.FirstName AS AuthorFirstName, up.LastName AS AuthorLastName, up.displayName,
                                         cat.Name AS CategoryName
                                         FROM Condition c
                                         LEFT JOIN UserProfile up on c.UserProfileId = up.Id
                                         LEFT JOIN Category cat on c.CategoryId = cat.Id
                                         WHERE c.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Condition condition = null;
                    if (reader.Read())
                    {
                        condition = new Condition()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "AuthorFirstName"),
                                LastName = DbUtils.GetString(reader, "AuthorLastName"),
                                DisplayName = DbUtils.GetString(reader, "displayName")
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")

                            }
                        };
                    }

                    reader.Close();

                    return condition;
                }
            }
        }
        public void Add(Condition condition)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Condition (Title, Content, ImageLocation, CreateDateTime, 
                                          CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Content, @ImageLocation, @CreateDateTime, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", condition.Title);
                    DbUtils.AddParameter(cmd, "@Content", condition.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", condition.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", condition.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", condition.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", condition.UserProfileId);

                    condition.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Condition condition)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Condition
                           SET Title = @Title,
                               Content = @Content,
                               ImageLocation = @ImageLocation,
                               CreateDateTime = @CreateDateTime,
                               CategoryId = @CategoryId,
                               UserProfileId = @UserProfileId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", condition.Title);
                    DbUtils.AddParameter(cmd, "@Content", condition.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", condition.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", condition.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", condition.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", condition.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", condition.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCondition(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        DELETE FROM Comment
                                        WHERE ConditionId = @id;
                                        DELETE FROM Condition
                                        WHERE Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }

}




