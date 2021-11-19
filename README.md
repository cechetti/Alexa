# Alexa
Alexa Skills Kit SDK (v2).

## Alexa Sample: Meu Afinador (Node.js)

This is a Node.js Alexa-Hosted sample skill, using SSML audio and APL screen background. 
Use case of this skill is for Guittar Tunning Purposes. 
It starts playing all guittar chords for standard tunning (E A D G B E). 
After that, it is possible to choose specific one by chord note, number or position. 
Current version supports pt-BR only.  

## Getting Started

### Data Source
Based on "Hello World" Alexa Dev Portal template: https://github.com/alexa-samples/skill-sample-nodejs-hello-world/blob/master/lambda/custom/index.js 
Audio files were recorded at home and processed using free Audacity software: https://www.audacityteam.org/

### Environment Variables

This is a stateless skill, no database of session variables needed. On top of index.js, there is launchDocument.json for APL. 

## Testing the Skill

Lauch skill and ask in pr-BR by chord note: mi, lá, ré, sol, si, mizinha.
Also possible to ask by number 1-6 or "primeira" to "sexta" corda. 

## License

This sample is licensed under the Amazon Software License.
