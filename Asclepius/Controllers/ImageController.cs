using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace Asclepius.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class ImageController : ControllerBase
        {
            private readonly IWebHostEnvironment _webhost;
            public ImageController(IWebHostEnvironment webhost)
            {
                _webhost = webhost;
            }

            [HttpPost]
            public IActionResult Upload(IFormFile file)
            {
                //local image storage in images on the wwwroot/images file
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
                try
                {
                using var image = Image.Load(file.OpenReadStream());

                    int originalWidth = image.Width;
                    int originalHeight = image.Height;


                    int maxWidth = 500;
                    if (originalWidth > maxWidth)
                    {
                        int newHeight = maxWidth * originalHeight;
                        newHeight /= originalWidth;

                        image.Mutate(i => i.Resize(maxWidth, newHeight));
                    }

                    image.Save(savedImagePath + file.FileName);
                }
                catch
                {
                    return Conflict();
                }

                return Ok();
            }
        /// <summary>
        /// Single Image By Name... wwwroot/images folder then look for file with name.
        /// </summary>
        /// <param name="imageName"></param>
        /// <returns></returns>
            [HttpGet("{imageName}")]
            public IActionResult Get(string imageName)
            {
                var path = Path.Combine(_webhost.WebRootPath, "images/", imageName);
                var imageFileStream = System.IO.File.OpenRead(path);
                return File(imageFileStream, "image/jpeg");
            }
        }
    }

