"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("邮编编码", function(){

    it("1. 5位，input:95713 ，return：|    |:|::	:|:|:	|:::|	:::||	::||:	:|:|:	| ", function(){
        var input = '95713';
        var result = main(input);
        var expect_string = '|\t|:|::\t:|:|:\t|:::|\t:::||\t::||:\t:|:|:\t|';
        expect(expect_string).to.equal(result);
    });

    it("2. 10位，input:95713-1234 ，return：|    |:|::	:|:|:   |:::|	:::||	::||:	:::||   ::|:|   ::||:   :|::|   :|:|:   | ", function(){
        var input = '95713-1234';
        var result = main(input);
        var expect_string = '|\t|:|::\t:|:|:\t|:::|\t:::||\t::||:\t:::||\t::|:|\t::||:\t:|::|\t:|:|:\t|';
        expect(expect_string).to.equal(result);
    });

    it("3. 9位，input:957131234 ，return：|    |:|::	:|:|:   |:::|	:::||	::||:	:::||   ::|:|   ::||:   :|::|   :|:|:   | ", function(){
        var input = '957131234';
        var result = main(input);
        var expect_string = '|\t|:|::\t:|:|:\t|:::|\t:::||\t::||:\t:::||\t::|:|\t::||:\t:|::|\t:|:|:\t|';
        expect(expect_string).to.equal(result);
    });

    it("4. 32位，input:||:|:::|:|:|:::|:::||::||::|:|:|，return：95713", function(){
        var input = '||:|:::|:|:|:::|:::||::||::|:|:|';
        var result = main(input);
        var expect_string = '95713';
        expect(expect_string).to.equal(result);
    });

    it("5. 32位(含异常)，input:||:|::1|:|:|:::|:::||::||::|:|:|，return:输入无效", function(){
        var input = '||:|::1|:|:|:::|:::||::||::|:|:|';
        var result = main(input);
        var expect_string = '输入无效';
        expect(expect_string).to.equal(result);
    });

    it("6. 52位，input:||:|:::|:|:|:::|:::||::||::::||::|:|::||::|::|:|:|:| ，return：957131234 or 95713-1234", function(){
        var input = '||:|:::|:|:|:::|:::||::||::::||::|:|::||::|::|:|:|:|';
        var result = main(input);
        var expect_string = '957131234 or 95713-1234';
        expect(expect_string).to.equal(result);
    });

    it("7. 52位(含异常)，input:||:|::1|:|:|:::|:::||::||::::||::|:|::||::|::|:|:|:|，return:输入无效", function(){
        var input = '||:|::1|:|:|:::|:::||::||::::||::|:|::||::|::|:|:|:|';
        var result = main(input);
        var expect_string = '输入无效';
        expect(expect_string).to.equal(result);
    });

    it("8. 其他，input:957 ，return：输入无效 ", function(){
        var input = '957';
        var result = main(input);
        expect(result).to.equal('输入无效');
    });


});