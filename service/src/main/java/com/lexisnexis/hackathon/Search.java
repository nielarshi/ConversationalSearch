package com.lexisnexis.hackathon;


import com.lexisnexis.hackathon.model.search.Response;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/search")
public class Search {

    @GET
    public String getMsg()
    {
        return "Hello from search";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response search() {
        Response response = new Response();
        response.setPretext("This.");
        response.setMainText("Main.");
        response.setPostText("That.");
        return  response;
    }

}
