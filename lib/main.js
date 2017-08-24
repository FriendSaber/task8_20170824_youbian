const loadAllItems = require('../lib/datbase');

function main(input){

    if(input.length%5 !== 2){
        if(input.length === 5 || input.length === 9){
            var str=input.split('');
        }
        else if(input.length === 10 ){
            var str1=input.split('-');
            var str = str1[0].concat(str1[1]).split('');
        }else{
            return '输入无效';
        }
        var allItams = loadAllItems();
        var string='|\t';
        var sum=0;
        for(var i=0;i<str.length;i++){
            sum+=parseInt(str[i]);
            for(var j=0;j<allItams.length;j++){
                if(allItams[j].number == str[i]){
                    string +=allItams[j].barcode+'\t';
                }
            }
        }
        for(var k=0;k<allItams.length;k++){
            if(allItams[k].number == sum%10){
                string += allItams[k].barcode+'\t';
            }
        }
        string +='|';
        return string;
    }

    //var flagInput = 0;
    if(input.length === 32 || input.length === 52){
        var str = input.split('');

        for(var i=0;str[i] == ':' || str[i] == '|';i++ );
        if(i !== input.length){
            return '输入无效';
        }else{
            var str1 = '';

            if(input.length === 32 ){
                 str1 = input.substring(1,31);

            }if(input.length === 52){
                 str1 = input.substring(1,51);
            }

            var arr = [];
            for(var m=0;m<str1.length/5-1;m++){
                arr[m] = str1.substring(5*m,m*5+5);
            }
            var string1 = '';
            var string2 = '';
            var string3 = '';
            var allItams1= loadAllItems();
            for(var m_index in arr){
                for(var m_item in allItams1){
                    if(arr[m_index] == allItams1[m_item].barcode){
                        if(m_index == 5){
                            string2 += '-';
                        }
                        string1 +=  allItams1[m_item].number.toString();
                        string2 +=  allItams1[m_item].number.toString();

                        break;
                    }
                }
            }
            if(arr.length > 5){
                string3 = string1+' or '+string2
            }
            else{
                string3 = string1;
            }
            return string3;
        }

    }

}

module.exports = main;
