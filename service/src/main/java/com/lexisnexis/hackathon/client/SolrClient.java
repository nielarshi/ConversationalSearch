package com.lexisnexis.hackathon.client;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.impl.XMLResponseParser;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class SolrClient {

    public List<String> call(String[] parameters) {
        List<String> listToReturn = new ArrayList<String>();


        SolrQuery query = new SolrQuery();
        query.set("q", parameters);

        String urlString = "http://localhost:8983/solr/judge-data-lake";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());
        QueryResponse response = null;
        try {
            response = solr.query(query);
            SolrDocumentList docList = response.getResults();

            for (SolrDocument doc : docList) {
                System.out.println((purifyData((String)doc.getFieldValue("_First_Name_"))));
                listToReturn.add(
                                purifyData((String)doc.getFieldValue("_judge_id_"))+":"+
                                purifyData((String)doc.getFieldValue("_First_Name_")) + " " +
                                purifyData((String)doc.getFieldValue("_Middle_Name_")) + " " +
                                purifyData((String)doc.getFieldValue("_Last_Name_"))
                );
            }
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return listToReturn;
    }

    public List<String> callCaseData(String caseId) {
        List<String> listToReturn = new ArrayList<String>();


        SolrQuery query = new SolrQuery();
        query.set("q", caseId);

        String urlString = "http://localhost:8983/solr/case-data-lake";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());
        QueryResponse response = null;
        try {
            response = solr.query(query);
            SolrDocumentList docList = response.getResults();

            for (SolrDocument doc : docList) {
                listToReturn.add(
                        purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.caseid"))+":"+
                                purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.name.content")) + " " +
                                purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.court.content"))
                );
            }
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return listToReturn;
    }

    public List<String> callCaseData(String[] randomStrs) {
        List<String> listToReturn = new ArrayList<String>();


        SolrQuery query = new SolrQuery();
        query.set("q", randomStrs);

        String urlString = "http://localhost:8983/solr/case-data-lake";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());
        QueryResponse response = null;
        try {
            response = solr.query(query);
            SolrDocumentList docList = response.getResults();

            for (SolrDocument doc : docList) {
                listToReturn.add(
                        purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.caseid"))+":"+
                                purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.name.content")) + " " +
                                purifyData((String)doc.getFieldValue("mets.dmdSec.mdWrap.xmlData.case.court.content"))
                );
            }
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listToReturn;
    }

    public List<String> callJudgeCaseMap(String judgeId) {
        List<String> listToReturn = new ArrayList<String>();


        SolrQuery query = new SolrQuery();
        query.set("q", judgeId);

        String urlString = "http://localhost:8983/solr/case-judge-map";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());
        QueryResponse response = null;
        try {
            response = solr.query(query);
            SolrDocumentList docList = response.getResults();

            for (SolrDocument doc : docList) {
                System.out.println((purifyData((long)doc.getFieldValue("judge_id")+"")));
                listToReturn.add(
                        purifyData((String)doc.getFieldValue("case_id")+"")+":"+
                                purifyData((long)doc.getFieldValue("judge_id")+"")
                );
            }
        } catch (SolrServerException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return listToReturn;
    }

    public String purifyData(String str) {
        return str.replace("'", "").trim();
    }

    public void saveFederalJudgeData() {
        //read CSV

        readCSV();


    }

    public static int PRETTY_PRINT_INDENT_FACTOR = 4;

    public void readXML() {

        final File folder = new File("data/federal/casemets");
        listFilesForFolder(folder);



    }

    public void listFilesForFolder(final File folder) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                String xmlFile = fileEntry.getName();
                BufferedReader br = null;
                String line = "";
                String str = "";
                try {

                    br = new BufferedReader(new FileReader("data/federal/casemets/"+xmlFile));
                    int count = 0;


                    SolrInputDocument document = null;
                    while ((line = br.readLine()) != null) {
                        str += line;
                    }

                    System.out.println(str);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }


                try {
                    JSONObject xmlJSONObj = XML.toJSONObject(str);
                    String jsonPrettyPrintString = xmlJSONObj.toString(PRETTY_PRINT_INDENT_FACTOR);
                    System.out.println(jsonPrettyPrintString);
                    try(  PrintWriter out = new PrintWriter("data/federal/json/"+ xmlFile.replace(".xml", ".json") )  ){
                        out.println(jsonPrettyPrintString);
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }
                } catch (JSONException je) {
                    System.out.println(je.toString());

                }
            }
        }
    }


    public void readCSV() {
        String urlString = "http://localhost:8983/solr/judge-data-lake";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());

        String csvFile = "data/federal-judges.csv";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";

        try {

            br = new BufferedReader(new FileReader(csvFile));
            int count = 0;

            List<String> labels = new ArrayList<String>();

            SolrInputDocument document = null;
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] judgeData = line.split(cvsSplitBy);

                if (count == 0) {
                    for (String label : judgeData) {
                        labels.add(label);
                    }
                } else {
                    document = new SolrInputDocument();
                    for (int i = 0; i < labels.size(); i++) {
                        if (i < judgeData.length) {
                            document.addField("'"+labels.get(i)+"'", "'"+judgeData[i]+"'");
                        }
                    }
                    try {
                        solr.add(document);
                        solr.commit();
                    } catch (SolrServerException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }


                count++;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public void readTSV() {
        String urlString = "http://localhost:8983/solr/case-judge-map";
        HttpSolrClient solr = new HttpSolrClient.Builder(urlString).build();
        solr.setParser(new XMLResponseParser());

        String csvFile = "data/caseId-judgeId.tsv";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = "\t";

        try {

            br = new BufferedReader(new FileReader(csvFile));
            int count = 0;

            List<String> labels = new ArrayList<String>();

            SolrInputDocument document = null;
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] judgeCaseMapData = line.split(cvsSplitBy);

                document = new SolrInputDocument();
                document.addField("case_id", judgeCaseMapData[0]);
                if (judgeCaseMapData.length > 1) {
                    document.addField("judge_id", judgeCaseMapData[1]);
                }
                try {
                    solr.add(document);
                    solr.commit();
                } catch (SolrServerException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static void main(String[] args) {
        SolrClient solrClient = new SolrClient();
        solrClient.readXML();
    }
}
