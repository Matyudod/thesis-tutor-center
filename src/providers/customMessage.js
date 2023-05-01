module.exports = (customMessage, message,customAction=null,customValueId=null, hasReason =false) => {
    let msg = {
        message: message.message,
        type: message.type,
    };
    msg.message = msg.message.replace("{1}", customMessage);
    if(customAction != null){
        msg.action = customAction
    }
    if(customValueId != null){
        msg.valueId = customValueId
    }
    if(hasReason){
        msg.hasReason = hasReason;
    }
    return msg;
};
