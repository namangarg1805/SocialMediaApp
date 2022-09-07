using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCodes, string message=null, string details=null)
        {
            this.statusCodes = statusCodes;
            this.message = message;
            this.details = details;
        }

        public int statusCodes{get;set;}
        public string message { get; set; }
        public string details { get; set; }
        
        
    }
}