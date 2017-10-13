package com.lexisnexis.hackathon.template;

import com.lexisnexis.hackathon.template.model.Template;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class TemplateParser {

    public List<Template> getTemplates() {
        List<Template> templateList = new ArrayList<Template>();
        try {

            File fXmlFile = new File("template.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(fXmlFile);

            //optional, but recommended
            //read this - http://stackoverflow.com/questions/13786607/normalization-in-dom-parsing-with-java-how-does-it-work
            doc.getDocumentElement().normalize();

            System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("template");

            System.out.println("----------------------------");

            Template template;
            for (int temp = 0; temp < nList.getLength(); temp++) {
                template = new Template();
                Node nNode = nList.item(temp);

                System.out.println("\nCurrent Element :" + nNode.getNodeName());

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                    Element eElement = (Element) nNode;
                    template.setName(eElement.getElementsByTagName("name").item(0).getTextContent());
                    template.setPreText(eElement.getElementsByTagName("pre-text").item(0).getTextContent());
                    template.setPostText(eElement.getElementsByTagName("post-text").item(0).getTextContent());

                    templateList.add(template);
                    System.out.println("Name : " + template.getName());
                    System.out.println("Pre Text : " + template.getPreText());
                    System.out.println("Post Text : " + template.getPostText());

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return templateList;
    }


    public static void main(String[] args) {
        TemplateParser templateParser = new TemplateParser();
        templateParser.getTemplates();
    }

}
