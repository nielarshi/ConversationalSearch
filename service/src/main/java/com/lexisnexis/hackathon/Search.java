package com.lexisnexis.hackathon;


import com.lexisnexis.hackathon.model.search.Response;
import com.lexisnexis.hackathon.template.TemplateParser;
import com.lexisnexis.hackathon.template.model.Template;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

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

        TemplateParser templateParser = new TemplateParser();
        List<Template> templateList = templateParser.getTemplates();
        response.setPretext(templateList.get(0).getPreText());
        response.setMainText("Main.");
        response.setPostText(templateList.get(0).getPostText());
        return  response;
    }

}
