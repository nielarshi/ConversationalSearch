package com.lexisnexis.hackathon;


import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/search")
public class Search {

    @GET
    public String getMsg()
    {
        return "Hello from search";
    }

}
