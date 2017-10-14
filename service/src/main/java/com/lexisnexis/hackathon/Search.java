package com.lexisnexis.hackathon;


import com.lexisnexis.hackathon.client.SolrClient;
import com.lexisnexis.hackathon.model.search.Request;
import com.lexisnexis.hackathon.model.search.Response;
import com.lexisnexis.hackathon.nlp.NLPHelper;
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
    public Response search(Request request) {
        Response response = new Response();


        String preText = "", postText = "";
        String mainText = "";

        TemplateParser templateParser = TemplateParser.getInstance();
        Template template = null;
        //find if it's greeting or ggodbye
        int playing = ifPlaying(request.getMessage());
        if (playing == 0) {
            template = templateParser.getTemplateFor("greeting");
            preText = template.getPreText();
            postText = template.getPostText();
        } else if (playing == 1) {
            template = templateParser.getTemplateFor("goodbye");
            preText = template.getPreText();
            postText = template.getPostText();
        } else {


            NLPHelper nlpHelper = new NLPHelper();
            List<List<String>> stringList = nlpHelper.extract(request.getMessage());


            SolrClient solrClient = new SolrClient();

            boolean isCase = false;
            for (String str2 : stringList.get(1)) {
                if (str2.contains("case")) {
                    isCase = true;
                    break;
                }
            }

            List<String> judgesList = solrClient.call(
                    stringList.get(0).toArray(new String[stringList.get(0).size()]));

            if (judgesList.size() == 0) {
                //check in number list
                if (stringList.get(2).size() > 0) {
                    List<String> judgesList2 = solrClient.call(
                            stringList.get(2).toArray(new String[stringList.get(2).size()]));
                    if (judgesList2.size() > 0) {
                        for (String str : judgesList2) {
                            mainText += mainText += "<br/>" + str.split(":")[1];
                        }
                    } else {
                        List<String> caseDetails = solrClient.callCaseData(stringList.get(2).get(0));
                        if (caseDetails.size() == 0) {
                            mainText += "<br/>Could not find actual case anywhere";
                        } else {
                            for (String caseDetailStr : caseDetails) {
                                mainText += "<br/>" + caseDetailStr;
                            }
                        }
                    }
                }

            } else {
                boolean bestResult = false;
                String matchedResult = "";
                for (String str : judgesList) {
                    int count = 0;
                    for (String str2 : stringList.get(0)) {
                        if (str.contains(str2)) {
                            System.out.println("Matched");
                            matchedResult += str;
                            count++;
                        }
                    }
                    if (count > 0 && count >= stringList.size() / 2) {
                        bestResult = true;
                        break;
                    }
                }

                if (!bestResult) {
                    template = templateParser.getTemplateFor("some-data");
                    preText = template.getPreText();
                    for (String str : judgesList) {
                        mainText += "<br/>" + str.split(":")[1];
                    }
                    postText = template.getPostText();
                } else {
                    if (isCase) {
                        mainText += "Need to fetch case for " + matchedResult;

                        //solr call for case ids
                        String judgeId = matchedResult.split(":")[0];
                        List<String> judgeCaseList = solrClient.callJudgeCaseMap(judgeId);

                        if (judgeCaseList.size() == 0) {
                            mainText += "<br/>Could not find any case of this user";
                        } else {
                            mainText += "<br/>Below are the cases";
                            for (String caseStr : judgeCaseList) {
                                mainText += "<br/>" + caseStr.split(":")[0];

                                //get individual case description from case lake
                                List<String> caseDetails = solrClient.callCaseData(caseStr.split(":")[0]);

                                if (caseDetails.size() == 0) {
                                    mainText += "<br/>Could not find actual case anywhere";
                                } else {
                                    for (String caseDetailStr : caseDetails) {
                                        mainText += "<br/>" + caseDetailStr;
                                    }
                                }

                            }
                        }

                    } else {
                        mainText += matchedResult;
                    }
                }
            }

            String mainTextNext = mainText.replace("<br/>", "").trim();

            if (mainTextNext.equalsIgnoreCase("")) {
                //do blind check
                List<String> judgesList3 = solrClient.call(
                        stringList.get(3).toArray(new String[stringList.get(2).size()]));
                if (judgesList3.size() > 0) {
                    for (String str : judgesList3) {
                        mainText += "<br/>" + str.split(":")[1];
                    }
                } else {
                    List<String> caseDetails = solrClient.callCaseData(stringList.get(3).toArray(new String[stringList.get(3).size()]));
                    if (caseDetails.size() == 0) {
                        mainText += "<br/>Could not find actual case anywhere";
                    } else {
                        for (String caseDetailStr : caseDetails) {
                            mainText += "<br/>" + caseDetailStr;
                        }
                    }
                }
            }

            mainTextNext = mainText.replace("<br/>", "").trim();

            if (mainTextNext.equalsIgnoreCase("")) {
                //do blind check
                String[] arrayReqStr = request.getMessage().split(" ");
                List<String> judgesList3 = solrClient.call(arrayReqStr);
                if (judgesList3.size() > 0) {
                    for (String str : judgesList3) {
                        mainText += "<br/>" + str.split(":")[1];
                    }
                } else {
                    List<String> caseDetails = solrClient.callCaseData(arrayReqStr);
                    if (caseDetails.size() == 0) {
                        mainText += "<br/>Could not find actual case anywhere";
                    } else {
                        for (String caseDetailStr : caseDetails) {
                            mainText += "<br/>" + caseDetailStr;
                        }
                    }
                }
            }


            if (preText.equalsIgnoreCase("")) {
                template = templateParser.getTemplateBasedOnOccurance(request.getMessage());
                preText = template.getPreText();
                postText = template.getPostText();
            }

            if (mainText.trim().equalsIgnoreCase("")) {
                template = templateParser.getTemplateFor("random");
                preText = template.getPreText();
                postText = template.getPostText();
            }
        }

        response.setPretext(preText);
        response.setMainText(mainText);
        response.setPostText(postText);
        return  response;
    }

    String[] greetingTexts = new String[]{
            "Hi",
            "Hello",
            "good morning",
            "Hey",
            "whatsup"
    };

    String[] goodbyeTexts = new String[]{
            "Bye",
            "goodbye",
            "night",
            "see ya"
    };
    public int ifPlaying(String text) {
        for (String greeting : greetingTexts) {
            if (text.contains(greeting)) {
                return 0;
            }
        }
        for (String goodbye : goodbyeTexts) {
            if (text.contains(goodbye)) {
                return 1;
            }
        }
        return 2;
    }

}
