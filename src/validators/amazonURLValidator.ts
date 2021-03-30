export const validateAmazonURL = (url: string) => {
    const re = /(amazon)\.((com)|(ca)|(cn)|(in)|(co)|(sg)|(ae)|(sa)|(fr)|(de)|(it)|(nl)|(pl)|(es)|(se))/g;
    return re.test(url);
};
