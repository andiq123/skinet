using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode();
        }

        private string GetDefaultMessageForStatusCode()
        {
            return StatusCode switch
            {
                400 => "A bad request, you have made.",
                401 => "Authorized, you are not.",
                404 => "Resource found, it was not.",
                500 => "The errors are the path of the dark side, errors leads to anger, anger leads to hate, hate leads to career change.",
                _ => null
            };
        }
    }
}