/* *
 * Alexa skill using the Alexa Skills Kit SDK (v2).
 * Guittar Tuner
 * 2021
 * */
const Alexa = require('ask-sdk-core');
const Util = require('./util.js');


// Read in the APL documents for use in handlers
const launchDocument = require('./launchDocument.json');

// Tokens used when sending the APL directives
const HELLO_WORLD_TOKEN = 'helloworldToken';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const audioUrl = Util.getS3PreSignedUrl("Media/Tune.mp3").replace(/&/g,'&amp;');
        const speechText = `Vou começar repassando a afinação padrão do violão, tocando duas vezes cada uma das seis cordas em sequência. Prepare-se para afinar de ouvido com o seu instrumento. Começando na sexta corda, mi, <audio src="${audioUrl}"/> pronto. Posso tocar isoladamente as notas mi, lá, ré, sol, si ou mizinha. Qual nota você quer?`;
        const repromtText = 'Eu também tenho o som do diapasão em 440 hertz. Você também pode pedir pelo número da corda de um a seis. Qual corda você quer que eu toque agora?';
        let responseBuilder = handlerInput.responseBuilder;

        // Add APL directive to response
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            // Add the RenderDocument directive to the responseBuilder
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: HELLO_WORLD_TOKEN,
                document: launchDocument
            });
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .getResponse();
            
    }
};

const PlayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayIntent';
    },
    handle(handlerInput) {

        // File URLs from S3.

        const audioUrlE2 = Util.getS3PreSignedUrl("Media/e2.mp3").replace(/&/g,'&amp;');
        const audioUrlA2 = Util.getS3PreSignedUrl("Media/a2.mp3").replace(/&/g,'&amp;');       
        const audioUrlD3 = Util.getS3PreSignedUrl("Media/d3.mp3").replace(/&/g,'&amp;');
        const audioUrlG3 = Util.getS3PreSignedUrl("Media/g3.mp3").replace(/&/g,'&amp;');
        const audioUrlB3 = Util.getS3PreSignedUrl("Media/b3.mp3").replace(/&/g,'&amp;');         
        const audioUrlE4 = Util.getS3PreSignedUrl("Media/e4.mp3").replace(/&/g,'&amp;');
        const audioUrlTune = Util.getS3PreSignedUrl("Media/Tune.mp3").replace(/&/g,'&amp;');        
        const audioUrlFork = Util.getS3PreSignedUrl("Media/fork.mp3").replace(/&/g,'&amp;');
        const repromtText = 'A qualquer momento peça para sair. Você pode pedir por alguma corda da primera até a sexta. Qual corda você vai querer?';

        // Get note slot from user input.
        
        const requestedNote = handlerInput.requestEnvelope.request.intent.slots.Chord.value;
        const requestedNumber = handlerInput.requestEnvelope.request.intent.slots.Number.value;
        const requestedOrdinal = handlerInput.requestEnvelope.request.intent.slots.Ordinal.value;
        let speechText = `Lá vai <audio src="${audioUrlTune}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;

        // Decide note to Play.
        
        if( (requestedNote === 'mi') || (requestedNumber === '6') || (requestedOrdinal  === '6') ){
                speechText = `Lá vai um mi <audio src="${audioUrlE2}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                
            }
            else {
                
            if( (requestedNote === 'lá') || (requestedNumber === '5') || (requestedOrdinal  === '5') ){
                    speechText = `Lá vai um lá <audio src="${audioUrlA2}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                }
                else {
                
                if( (requestedNote === 'ré') || (requestedNumber === '4') || (requestedOrdinal  === '4') ){
                        speechText = `Lá vai um ré <audio src="${audioUrlD3}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                    }
                    else {
                    
                    if( (requestedNote === 'sol') || (requestedNumber === '3') || (requestedOrdinal  === '3') ){
                            speechText = `Lá vai um sol <audio src="${audioUrlG3}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                        }
                        else {
                                        
                        if( (requestedNote === 'si') || (requestedNumber === '2') || (requestedOrdinal  === '2') ){
                                speechText = `Lá vai um si <audio src="${audioUrlB3}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                            }
                            else {
                            if( (requestedNote === 'mizinha') || (requestedNumber === '1') || (requestedOrdinal  === '1') ){
                                    speechText = `Lá vai uma mizinha <audio src="${audioUrlE4}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                                }
                                else {
                                    
                                if( (requestedNote === 'diapasão') ){
                                        speechText = `Lá vai o diapasão em 440 Hz <audio src="${audioUrlFork}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                                    }
                                    else {
                                    if( (requestedNote === 'todas') ){
                                            speechText = `Lá vão todas as cordas do violão, da sexta para a primeira <audio src="${audioUrlTune}"/> pronto. Você pode pedir uma nota entre mi, lá, ré, sol, si ou mizinha, qual delas você vai querer agora?`;
                                        }
                                        else {
                                            speechText = `Não consigo atender seu pedido. Eu também tenho o som do diapasão em 440 hertz. Você também pode pedir pelo número da corda de um a seis. Qual delas você quer que eu toque?`;
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    }    
                }    
            }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .getResponse();        
    }
};

const PlayIntentSlotOnlyHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayIntentSlotOnly';
    },
    handle(handlerInput) {
        // File URLs from S3.

        const audioUrlE2 = Util.getS3PreSignedUrl("Media/e2.mp3").replace(/&/g,'&amp;');
        const audioUrlA2 = Util.getS3PreSignedUrl("Media/a2.mp3").replace(/&/g,'&amp;');       
        const audioUrlD3 = Util.getS3PreSignedUrl("Media/d3.mp3").replace(/&/g,'&amp;');
        const audioUrlG3 = Util.getS3PreSignedUrl("Media/g3.mp3").replace(/&/g,'&amp;');
        const audioUrlB3 = Util.getS3PreSignedUrl("Media/b3.mp3").replace(/&/g,'&amp;');         
        const audioUrlE4 = Util.getS3PreSignedUrl("Media/e4.mp3").replace(/&/g,'&amp;');
        const audioUrlTune = Util.getS3PreSignedUrl("Media/Tune.mp3").replace(/&/g,'&amp;');        
        const audioUrlFork = Util.getS3PreSignedUrl("Media/fork.mp3").replace(/&/g,'&amp;');
        const repromtText = 'A qualquer momento peça para sair. Eu também tenho o som do diapasão em 440 hertz. Você também pode pedir pela posição da corda, da primeira a sexta. Qual você vai querer agora?';

        // Get note slot from user input.
        
        const requestedNote = handlerInput.requestEnvelope.request.intent.slots.Chord.value;
        const requestedNumber = handlerInput.requestEnvelope.request.intent.slots.Number.value;
        const requestedOrdinal = handlerInput.requestEnvelope.request.intent.slots.Ordinal.value;
        let speechText = `Lá vai <audio src="${audioUrlTune}"/> pronto. Qual corda você vai querer agora de um a seis?`;

        // Decide note to Play.
        
        if( (requestedNote === 'mi') || (requestedNumber === '6') || (requestedOrdinal  === '6') ){
                speechText = `Afinando corda mi <audio src="${audioUrlE2}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                
            }
            else {
                
            if( (requestedNote === 'lá') || (requestedNumber === '5') || (requestedOrdinal  === '5') ){
                    speechText = `Afinando corda lá <audio src="${audioUrlA2}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                }
                else {
                
                if( (requestedNote === 'ré') || (requestedNumber === '4') || (requestedOrdinal  === '4') ){
                        speechText = `Afinando corda ré <audio src="${audioUrlD3}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                    }
                    else {
                    
                    if( (requestedNote === 'sol') || (requestedNumber === '3') || (requestedOrdinal  === '3') ){
                            speechText = `Afinando corda sol <audio src="${audioUrlG3}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                        }
                        else {
                                        
                        if( (requestedNote === 'si') || (requestedNumber === '2') || (requestedOrdinal  === '2') ){
                                speechText = `Afinando corda si <audio src="${audioUrlB3}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                            }
                            else {
                            if( (requestedNote === 'mizinha') || (requestedNumber === '1') || (requestedOrdinal  === '1') ){
                                    speechText = `Afinando corda mizinha <audio src="${audioUrlE4}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                                }
                                else {
                                    
                                if( (requestedNote === 'diapasão') ){
                                        speechText = `Afine com o som do diapasão em 440 hertz, que equivale a um lá <audio src="${audioUrlFork}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                                    }
                                    else {
                                    if( (requestedNote === 'todas') ){
                                            speechText = `Vou repassar todas as cordas então, prepare-se <audio src="${audioUrlTune}"/> pronto. Qual corda você vai querer agora de um a seis?`;
                                        }
                                        else {
                                            speechText = 'Não consigo atender seu pedido. Você pode pedir pelas notas mi, lá, ré, sol, si e mizinha. Qual delas você vai querer?';
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    }    
                }    
            }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromtText)
            .getResponse();        
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'O violão possui seis cordas, a afinação padrão é feita nesta sequência: mi, lá, ré, sol, si e mizinha. Eu posso ajudar tocando estas notas para você afinar de ouvido, eu também tenho o som do diapasão em 440 hertz. A qualquer momento peça para sair. Você pode pedir para tocar as notas das cordas mi, lá, ré, sol, si, mizinha ou todas. Qual destas você vai querer?';
        const repromptOutput = 'Eu também tenho o som do diapasão em 440 hertz, que equivale a um lá, para afinar qualquer instrumento. Você também pode pedir pelo número da corda de um a seis.  Qual delas você vai querer?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = ' Até logo! ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpe, não sei sobre isso. Por favor tente novamente dizendo o número de uma corda de um a seis. Qual número?';
        const repromptOutput = 'Desculpe, não saberia como responder sobre isso. Por favor tente novamente dizendo uma nota entre as opções mi, lá, ré, sol, si e mizinha. Qual delas?';        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você pediu por ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Desculpe, eu tive um problema para executar o que você pediu. Por favor, tente novamente.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayIntentHandler,
        PlayIntentSlotOnlyHandler,   
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();