var domainDirectory = '';    // KT-Cloud Server domain-Directory
if(location.href.indexOf('front') > -1) {
    domainDirectory = "/front";
}

//공통함수 호출
var $commonUtil = {
    //주소팝업
    fn_popJuso : function(popupId){
        var jusopop = window.open("/juso/jusoPopup.do?popupId="+popupId,"jusopop","width=570,height=420, scrollbars=yes, resizable=yes");    // 20220118 주소검색API 호출로 변경 - 최남수
        jusopop.focus();
    },
}

/* 
 * 숫자, 마침표만 입력 jquery.alphanumeric.pack과 사용
 * [ID버전]
 */
function onlyNum(id) {
    $('#'+id).numeric({allow:"."});
    $('#'+id).css("ime-mode","disabled");
}

/* 
 * 숫자만 입력
 * [ID버전]
 */
function onlyNum2(id) {
    $('#'+id).numeric();
    $('#'+id).css("ime-mode","disabled");
}

/* 
 * 숫자, 하이픈만 입력 jquery.alphanumeric.pack과 사용 
 * (- 하이픈 허용) [ID 버전]
 */
function onlyNum3(id) {
    $('#'+id).numeric({allow:"-"});
    $('#'+id).css("ime-mode","disabled");
}

/* 
 * 숫자, 콤마만 입력 
 * [클래스 버전]
 */
function onlyNumClass(classId) {
    $('.'+classId).numeric({allow:"."});
    $('.'+classId).css("ime-mode","disabled");
}

/* 
 * 숫자만 입력 
 * [클래스 버전]
 */
function onlyNumClass2(classId) {
    $('.'+classId).numeric();
    $('.'+classId).css("ime-mode","disabled");
}

/* 
 * 숫자, 하이픈만 허용 jquery.alphanumeric.pack과 사용 
 * (- 하이픈 허용) [클래스버전]
 */
function onlyNumClass3(classId) {
    $('.'+classId).numeric({allow:"-"});
    $('.'+classId).css("ime-mode","disabled");
}

/* 
 * 해당 객체 숫자 입력만 허용
 * 예시 oninput="this.value = onlyNumObj(this);"
 */
function onlyNumObj(obj) {
    return obj.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\./g, '$1');
}

/* 
 * 해당 Obj 금액 표현
 */
function onkeyUpCommaInt(obj) {
    if(event.keyCode == 9) {
        return;
    }
    var input = String($(obj).val());
    if(input == '') return 0;
    var input1 = "";
    var input2 = "";
    if(input.indexOf(".") > -1) {    // 소숫점이 있을때 
        var sInput = input.split(".");
        input1 = sInput[0].replace(/,/g, "");
        input2 = "." + sInput[1];
    } else {
        input1 = input.replace(/,/g, "");
    }
    
    $(obj).val(input1.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,') + input2);
}

/*
 * 해당 문자 금액 표현(콤마 입력)
 */
function getCommaInt(input) {
    input = String(input);
    if(input == '') {
        return 0;
    }
    var input1 = "";
    var input2 = "";
    var result = "";
    if(input.indexOf(".") > -1) {    // 소숫점이 있을때 
        var sInput = input.split(".");
        input1 = sInput[0].replace(/,/g, "");
        input2 = "." + sInput[1];
    } else {
        input1 = input.replace(/,/g, "");
    }
    
    return input1.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,') + input2;
}

/*
 * 해당 문자 금액 표현 제거(콤마 제거)
 */
function getReplaceCommaInt(input) {
    input = String(input);
    if(input == '') {
        return 0;
    }
    var input1 = "";
    var input2 = "";
    var result = "";
    if(input.indexOf(".") > -1) {    // 소숫점이 있을때 
        var sInput = input.split(".");
        input1 = sInput[0].replace(/,/g, "");
        input2 = "." + sInput[1];
    } else {
        input1 = input.replace(/,/g, "");
    }
    
    return input1+input2;
}

/* 
 * 해당 문자 포함 여부 확인
 */
function containsCharsOnly(input,chars) {
    for(var i=0; i< input.length; i++) {
        if(chars.indexOf(input.charAt(i)) == -1)
            return false;
    }
    return  true;
}

/* 
 * 해당 id 값 null 체크 및  alert, focus
 */
function checkNullNAlert(id, msg) {
    if(jQuery('#'+id).val() == '') {
        alert(msg);
        jQuery('#'+id).focus();
        //setInputWaringColor(id);    // input focus
        return false;
    } else {
        //removeInputWaringColor(id);
        return true;
    }
}

/*
 * 입력 필드의 문자 크기를 얻는다.. (한글까지 고려하여 계산됨)
 * @@param String   문자열
 * @@return int 문자열의 길이
*/
function fn_getLenByByte(valueR) {
    var byteLength = 0;
    for (var inx = 0; inx < valueR.length; inx++) {
        var oneChar = escape(valueR.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 3;//원래 3인걸 2로 수정
        } else if (oneChar.indexOf("%") != -1) {
            //byteLength += oneChar.length/3;
            byteLength ++;
        }
    }
    return byteLength;
}

/*
 * 입력값이 알파벳인지 체크
 * @@param obj   Object
 * @@return true 알파벳일 경우
 */
function fn_isAlphabet(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(obj.value,chars);
}

/* 
 * input 박스에 경고 처리
 */
function setInputWaringColor(id) {
    //jQuery('#'+id).css("background-color", "#FFBBBB");
    jQuery('#'+id).focus();
}

/* 
 * input 박스에 경고 해제
 */
function removeInputWaringColor(id) {
    //jQuery('#'+id).css("background-color", "#FFFFFF");
}

/* 
 * 현재 스크롤 위치 반환
 */
var getNowScroll = function(){ 
    var de = document.documentElement; 
    var b = document.body; 
    var now = {}; 
    now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX); 
    now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY); 
    return now; 
};

/* 
 * 해당 문자 왼쪽 처음부터 문자 채움
 * str : 해당 문자 , fullLength : 총 문자수, putStr : 채울 문자
 */
function lpad(str, fullLength, putStr) {
    str = String(str);
    putStr = String(putStr);
    
    var rtnVal = "";
    if(str == null) return "";
    if(putStr == null) return "";
    if(putStr.length > 1) return "";
    
    var putCnt = fullLength - str.length;
    
    for(var i = 0; i < putCnt ; i++ ) {
        rtnVal = rtnVal + "" + putStr;
    }
    return rtnVal + "" + str;
}

/* 
 * 날짜 기간 체크 
 */
function checkPeriodDate(startDate, endDate) {
    var rtnMsg = true;
    
    startDate = startDate.replace("-", "");
    startDate = startDate.replace("-", "");
    
    endDate = endDate.replace("-", "");
    endDate = endDate.replace("-", "");
    
    if(startDate > endDate) {
        rtnMsg = false; 
    } 
    
    return rtnMsg;
}

function isValidDate(iDate){
    //todo
    return true;
}

//백스페이스바, 방향키, 페이지 업다운, 시프트 등  처리등 입력 안되는 것들 눌렀을때 true
/*
function vaildKeyCodeForNoInput(ekc) {
    
    if(ekc == 9 || ekc == 18 || ekc == 20 || ekc == 45 || ekc == 25 
            || ekc == 8 || ekc == 33 || ekc == 34 
            || ekc == 35 || ekc == 36 || ekc == 37 || ekc == 38 
            || ekc == 39 || ekc == 40 || ekc == 46 || ekc == 16 
            || ekc == 17) 
        return true;
    else
        return false;
}
*/

/* 
 * 파일다운
 */
function fileDown(path, fileNm, fileOrg) {
    $('#filepath').val(path);
    $('#filename').val(fileNm);
    $('#orgfilename').val(fileOrg);
    
    $("#fileFrm").attr("target","fileIframe");
    $("#fileFrm").submit();
}

/* 
 * 확장자 리턴
 */
function extractFileExt(fileName) {
    var sameLast = fileName.lastIndexOf(".");
    if (sameLast > 0) {
        return fileName.substr(sameLast+1, fileName.length-sameLast-1);
    }
    return "";
}

/* 
 * mouse over 줄 색상 변경
 * onmouseover="onFocusBgCh(this);" class="onFocusBgCh"
 * 테이블 tr 추가 필요
 */
function onFocusBgCh(obj) { 
 $('.onFocusBgCh').attr("bgcolor","");
 $(obj).attr("bgcolor","#efefef"); 
}

/*
 * 현재 날짜 조회
 */
function getNowDay() {
    var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
    
    var chan_val = year + '-' + mon + '-' + day;
    return chan_val;
}

/*
 * 현재날짜 한달 전,후 날짜 조회
 * arg : prev - 전 달 날짜 , next - 다음 달 날짜
 */
function getPrevNextMonth(arg) {
    var now = new Date();
    var year= now.getFullYear();
    var mon;
    
    if(arg == "prev") {
        mon = (now.getMonth())>9 ? ''+(now.getMonth()) : '0'+(now.getMonth());
    } else {
        mon = (now.getMonth()+2)>9 ? ''+(now.getMonth()+2) : '0'+(now.getMonth()+2);
    }
    
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
    
    var chan_val = year + '-' + mon + '-' + day;
    return chan_val;
}

/*
* 현재날짜 일년 전, 후 날짜 조회 
* arg : prev - 전년 날짜 , next - 다음년 날짜
*/
function getPrevNextYear(arg) {
    var now = new Date();
    var mon = (now.getMonth()+1);
    var year;
    
    if(arg == "prev"){
        year = (now.getFullYear()-1);
    }else{
        year = (now.getFullYear()+1);
    }
    
    mon = mon > 9 ? ''+mon : '0'+mon;
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
    
    var chan_val = year + '-' + mon + '-' + day;
    return chan_val;
}

/* 
 * 현재날짜 기준 해당 년도 전 날짜 조회
 */
function getPrevYear(i) {
    var now = new Date();
    var mon = (now.getMonth()+1);
    var year = (now.getFullYear() - Number(i));
    mon = mon > 9 ? ''+mon : '0'+mon;
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
    var chan_val = year + '-' + mon + '-' + day;
    return chan_val;
}

/* 
 * 같은 name의 checkbox 값 묶음
 * 체크박스 명 : prefix _
 * 구분자 : 쉼표(,)
 */
function checkBoxSearchParamSetting(name) {
    var i = 0;
    var value = "";
    $("input[name=_"+name+"]:checked").each(function() {
        if(i != 0) {
            value += ",";
        }
        value+=$(this).val();
        
        i++;
    });
    $('#'+name).val(value);
}

/* 
 * 파라미터로 넘어온 체크박스 체크처리
 */
function firstSettingCheckBox(name, param) {
    var splitCode = param.split(",");
    for (var idx in splitCode) {
        $("input[name=_"+name+"][value=" + splitCode[idx] + "]").attr("checked", true);
    }
}

/* 
 * trim 함수
 */
function fnTrim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

/**
 * ajax 공통 모듈
 * url : 
 * data :
 * dataType : json / html / xml / text
 * callback : 콜백함수
 */    
function ajaxSubmit(url, data, dataType, callback){
    $.ajax({
        url : url,
        data : data,
        dataType : dataType,
        type : 'POST',
        success : function(result) {
            callback(result);
        },
        error : function(e) {
            alert("error :" + e.responseText);
        }
    });
}

function ajaxSubmitSync(url, data, dataType){
    return $.ajax({
        url : url,
        data : data,
        dataType : dataType,
        type : 'POST',
        error : function(e) {
            alert("error :" + e.responseText);
        },
        async: false
    }).responseText;
}

/* 
 * 글자 수 제한
 */
function limitCharacters(textid, limit, limitid) {
    var text = $('#'+textid).val(); // 입력값 길이 저장
    var textlength = text.length;
    if(textlength > limit) {
        //console.log(Number(limit) - Number(textlength));
        $('#' + limitid).html(limit - textlength);
        $('#'+textid).val(text.substr(0,limit));
        return false;
    } else {
        //console.log(Number(limit) - Number(textlength));
        $('#' + limitid).html(limit - textlength);
        return true;
    }
}

/* 
 * 이메일 형식 확인
 */
function isEmail(obj) {
    var regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var $email = obj.val();
    
    if(!regExp.test($email)) {
        alert('이메일 주소가 유효하지 않습니다');
        obj.focus();
        return false;
    }
    return true;
}

/* 
 * 패스워드 형식 확인
 */
function isPassword(obj) {
    var regExp = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
    var $pwd = obj.val();
    
    if(!regExp.test($pwd)) {
        alert('8 ~ 20자의 영문/숫자/특수문자 혼용만 가능합니다!.');
        obj.val('');
        obj.focus();
        return false;
    }
    return true;
}  

function isPassword2(objVal) {
    var regExp = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
    var $pwd = objVal;
    if(!regExp.test($pwd)) {
        alert('8 ~ 20자의 영문/숫자/특수문자 혼용만 가능합니다!.');
        obj.val('');
        obj.focus();
        return false;
    }
    return true;
}  

/* 
 * 사업자등록번호 확인
 */
function checkBizRegNo(bizID) {
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var i, Sum=0, c2, remander;
    bizID = bizID.replace(/-/gi,''); 
    for(i=0; i <=7; i++){
        Sum += checkID[i] * bizID.charAt(i);
    }
    c2 =  "0"+ (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    Sum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (Sum % 10)) % 10 ;
    
    if (bizID.length != 10){
        return false ;
    } else if(Math.floor(bizID.charAt(9)) != remander){
        return false ;
    } else {
        return true ;
    }
}

/* 
 * 사업자등록번호 확인
 * 하이픈(-) 포함
 */ 
function checkBizRegNo2(bizID) {
    if(bizID.length != 12)
        return false;
    else 
        return checkBizRegNo(bizID);
}

/*************************************************************************
함수명: valueEmpty 
설  명: input,textarea type value가 empty 인지 확인
리  턴: boolean 
사용예:
$("#userid").valueEmpty();   msg인자가 들어올경우 message 반환
***************************************************************************/
$.fn.valueEmpty = function(msg) {
    
    if ($.trim($(this).val()).length < 1) {
        if(msg != undefined){
            alert(msg);
            $(this).focus();
        }
        return true;
    } else {
        return false;
    }
};

//라디오 박스 선택 안하면 true 반환 
function isEmptyRadioVal(radioName, msg) {
    if($.trim( $("input[name="+radioName+"]:checked").val()).length < 1) {
        alert(msg);
        $("input[name="+radioName+"]").focus();
        return true;
    } else {
        return false;
    }
}

//체크 박스 선택 안하면 true 반환 
function isEmptyCheckboxVal(checkboxName, msg) {
    if(!$("input[name="+checkboxName+"]").is(":checked")) {
        alert(msg);
        $("input[name="+checkboxName+"]").focus();
        return true;
    } else {
        return false;
    }
}

//체크 박스 선택 안하면 false 반환 
function isEmptyChkboxVal(checkboxName) {
    if(!$("input[name="+checkboxName+"]").is(":checked")) {
        return false;
    } else {
        return true;
    }
}

//30줄이상 줄바꿈
function rowDownString(StringText) {
    
    if(StringText != null && StringText.length>31) {
        var StringLength = StringText.length; //넘겨받은 텍스트의 글자수
        var StringRows = Math.ceil(Number(StringLength/31)); // 생성될 줄의 수
        
        var textArray =[];
        var startCols = 1;// 시작 칸수
        var endCols = 1; //종료 칸수
        var resultText ="";
        //바꿔질 줄의 수만큼 for문
        for(var i=0; i<StringRows; i++){
            startCols = Number((i*31));
            
            if(i<StringRows){
                endCols = Number((i+1)*31);
                
            //마지막열일경우
            }else if(i ==Number(StringRows-1)){
                endCols = StringLength;
            }
            textArray[i] = StringText.substring(startCols,endCols);
            resultText += textArray[i]+"<br/>";
        }
        return resultText;
    } else{
        return StringText;
    }
}

function rowDownString2(StringText, leng) {
    
    if(StringText != null && StringText.length> (leng + 1)) {
        var StringLength = StringText.length; //넘겨받은 텍스트의 글자수
        var StringRows = Math.ceil(Number(StringLength/(leng + 1))); // 생성될 줄의 수
        
        var textArray =[];
        var startCols = 1;// 시작 칸수
        var endCols = 1; //종료 칸수
        var resultText ="";
        //바꿔질 줄의 수만큼 for문
        for(var i=0; i<StringRows; i++){
            startCols = Number((i*(leng + 1)));
            
            if(i<StringRows){
                endCols = Number((i+1)*(leng + 1));
                
            //마지막열일경우
            }else if(i ==Number(StringRows-1)){
                endCols = StringLength;
            }
            textArray[i] = StringText.substring(startCols,endCols);
            resultText += textArray[i]+"<br>";
        }
        return resultText;
    } else{
        return StringText;
    }
}

//아이디 유효성 체크
function isValidAdminId(idVal){
    var idStartText = idVal.substring(0,1);
    var idLength = idVal.length;
    
    if(idLength < 4 || idLength > 21 ){
        alert("4~20자리까지만 입력 가능합니다.");
        return false;
    }
    if(idStartText >= 0 || idStartText < 10){
        alert("첫번째자리에 숫자는 사용할수없습니다.");
        return false;
    }
    return true;
}

//첨부 가능한 파일 이름인지 체크 true 일때 정상 파일 
function canUploadFileName(fileName) {
    if(fileName == "") 
        return true;
    
    var extName = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
    
    var extWhiteFormat = "\(xls|xlsx|doc|docx|ppt|pptx|hwp|pdf|zip|txt|tiff|gif|bmp|png|jpg|jpeg)";
    if(!(new RegExp(extWhiteFormat,"i")).test(extName)) 
        return false;
    else return true;
    
}

//숫자에 콤마  자동 생성
function inputNumberFormat(obj) {
    obj.value = getCommaInt(uncomma(obj.value));
}

// 콤마 찍기
function comma(str) {
    str = String(str);
    str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//tyjun 콤마 없애기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// tyjun 한글 금액 찍기
function _fmtNumberKor(val,target){ 
    var numKor = new Array("", "일", "이", "삼", "사","오","육","칠","팔","구","십"); // 숫자 문자 
    var danKor = new Array("", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천", "", "십", "백", "천"); // 만위 문자열 
    var result = ""; if(val && !isNaN(val)){ // CASE: 금액이 공란/NULL/문자가 포함된 경우가 아닌 경우에만 처리
        for(i=0; i < val.length; i++) { 
            var str = ""; 
            var num = numKor[val.charAt(val.length - (i+1))]; 
            if(num != "") str += num + danKor[i]; // 숫자가 0인 경우 텍스트를 표현하지 않음 
            switch(i){ 
                case 4:str += "만";break; // 4자리인 경우 '만'을 붙여줌 ex) 10000 -> 일만 
                case 8:str += "억";break; // 8자리인 경우 '억'을 붙여줌 ex) 100000000 -> 일억 
                case 12:str += "조";break; // 12자리인 경우 '조'를 붙여줌 ex) 1000000000000 -> 일조 
            } 
            result = str + result; 
        } 
        result = result + "원"; 
    } 
    return result ; 
}

//getCookie 쿠키값 뽑기
function getCookie(cookieNm){
    var i,x,y,ARRcookies = document.cookie.split(";");
    
    for (i=0; i<ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g,"");
        
        if (x == cookieNm) {
            return unescape(y);
        }
    }
}

//setCookie 쿠키값 세팅
function setCookie(cookieNm, value, exdays){
    var exdate = new Date();
    //exdate.setDate(exdate.getDate() + exdays);
    
    //24시간 기준 쿠키 생성
    exdate.setTime(exdate.getTime() + (exdays*24*60*60*1000));
    //console.log('cookieNm: ', cookieNm, '\nvalue: ', value,'\nexdays: ', exdays,'\nexdate.getTime(): ', exdate.getTime());
    
    var cookieVal = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()); //exdays가 null이면 "", null이 아니면 exdate.toUTCString()
    //console.log('cookieVal: ', cookieVal);
    document.cookie = cookieNm + " = " + cookieVal;
    //console.log('document.cookie: ', document.cookie);
}

// 값 유효성 체크 - 송대환
function valCheck(id,text) {

    var str = document.getElementById(id);
    var val = document.getElementById(id).value;
    console.log(val);
    if (str.value == '' || str.value == null) {
        alert(text+'을 입력해주세요');
        return false;
    }
    
    var blank_pattern = /^\s+|\s+$/g;
    if (str.value.replace(blank_pattern, '') == "") {
        alert(text+'에 공백만 입력되었습니다.');
        return false;
    }
    
    //공백 금지
    // var blank_pattern = /^\s+|\s+$/g;(/\s/g
    /*
    var blank_pattern = /[\s]/g;
    if (blank_pattern.test(str.value) == true) {
        alert(text+'에 공백은 사용할 수 없습니다.');
        return false;
    }
    */
    var special_pattern = /[`~!#$%^&*|\\\'\";:\/?]/gi;
    
    if (special_pattern.test(str.value) == true) {
        alert(text+'에 특수문자는 사용할 수 없습니다.');
        return false;
    }
    
    // alert('최종 : ' + str.value);
    
    /*
     * if( str.value.search(/\W|\s/g) > -1 ){ alert( '특수문자 또는 공백을 입력할 수 없습니다.' );
     * str.focus(); return false; }
     */
    return true;
}

// 스크랩 저장
function fn_scrap(di){
    
    if(confirm('현재 페이지를 스크랩하시겠습니까?')) {
        var bmarkTypeCd ="";
        var bmarkUrl = $(location).attr('pathname')+""+$(location).attr('search');
        var bmarkMenuNo = $('#bmarkMenuNo').val();
        var bbsNo = $('#bbsNo').val();
        var idxNo = "";
        
        var chkDi = di;
        
        if (chkDi == '' || chkDi == undefined || chkDi == 'null'){
            alert("스크랩은 본인인증 후 진행하실 수 있습니다.");
            $kcbIdnttVrfct.showIdnttVrfctPop('');
            return false;
        }
        
        if (bbsNo != '' && bbsNo != undefined){
            idxNo = $('#bbscttNo').val();
            if (idxNo == '' || idxNo == undefined){
                bmarkTypeCd = 'BBS';
                rdcnt = '1';
                bmarkNm = $('.oneT1').text();
            }else{
                bmarkTypeCd = 'BBS';
                rdcnt = $('#rdcnt').val();
                bmarkNm = $('#bmarkNm').val();
            }
        } else {
            bmarkTypeCd = 'CONTS';
            idxNo = $('#contsNo').val();
            rdcnt = '1';
            bmarkNm = $('.oneT1').text();
        }
        
        postData = {
            bmarkTypeCd: bmarkTypeCd
            , bmarkUrl: bmarkUrl
            , bmarkMenuNo: bmarkMenuNo
            , bmarkNm: bmarkNm
            , bbsNo: bbsNo
            , rdcnt: rdcnt
            , idxNo: idxNo
            , di: chkDi
        }
        //console.log(postData);
        //return false;
        
        $.ajax ({
            type: 'post'
            , url: '/front/mypage/myScrap/insertMyScrapData.do'
            , data: postData
            , dataType: 'json'
            , async: 'false'
            , success: function(data) {
                if(data.rsltCd == 'SUCCESS') {
                    alert('스크랩에 저장되었습니다.');
                    $('#scrapBtn').addClass('on');
                    
                    if(confirm('MY스크랩으로 이동하시겠습니까?')) {
                        location.href = '/front/mypage/myScrap/selectMyScrapList.do';
                    }
                } else { 
                    if(data.msg !=''){
                        alert(data.msg);
                    }else{
                        alert('스크랩 저장에 실패하였습니다.');
                    }
                    return false;
                }
            }
            , error: function(e) {
                alert('스크랩 저장에 실패하였습니다.');
                return false;
            }
        });
    }
}




function ajaxPaging(){ 
	$('table.pagingTable').each(function() {
	    var pagesu = 15; //페이지 번호 갯수
	    var currentPage = 0;
	    var numPerPage = 15; //목록의 수
	    var $table = $(this);

	    //length로 원래 리스트의 전체길이구함
	    var numRows = $table.find('tbody tr').length;
	    //Math.ceil를 이용하여 반올림
	    var numPages = Math.ceil(numRows / numPerPage);
	    //리스트가 없으면 종료
	    if (numPages == 0) return;
	    //pager라는 클래스의 div엘리먼트 작성
	    var $pager = $('<ul class="ac tc onePaging" id="pagewrap"><li class="pager"></li></ul>');

	    var nowp = currentPage;
	    var endp = nowp + 15;

	    //페이지를 클릭하면 다시 셋팅
	    $table.on('repaginate', function() {
	        //기본적으로 모두 감춘다, 현재페이지+1 곱하기 현재페이지까지 보여준다

	        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
	        $("#pagewrap").html("");

	        if (numPages > 1) { // 한페이지 이상이면
	            if (currentPage < 5 && numPages - currentPage >= 5) { // 현재 5p 이하이면
	                nowp = 0; // 1부터 
	                endp = pagesu; // 10까지
	            } else {
	                nowp = currentPage - 5; // 6넘어가면 2부터 찍고
	                endp = nowp + pagesu; // 10까지
	                pi = 1;
	            }

	            if (numPages < endp) { // 10페이지가 안되면
	                endp = numPages; // 마지막페이지를 갯수 만큼
	                nowp = numPages - pagesu; // 시작페이지를   갯수 -10
	            }
	            if (nowp < 1) { // 시작이 음수 or 0 이면
	                nowp = 0; // 1페이지부터 시작
	            }
	        } else { // 한페이지 이하이면
	            nowp = 0; // 한번만 페이징 생성
	            endp = numPages;
	        }
	        // [처음]
	        $('<li class="onePagingIcon"><a href="#none" class="page-number" ><i class="icon-prev6"></i></a></li>').on('click', {newPage: page}, function(event) {
	            currentPage = 0;
	            $table.trigger('repaginate');
	            $($(".page-number")[2]).addClass('on').siblings().removeClass('on');
	        }).appendTo($pager);
            //.addClass('clickable');
	        // [이전]
	        $('<li class="onePagingIcon"><a href="#none" class="page-number" style="display:none"><i class="icon-prev"></i></a></li>').on('click', {
	            newPage: page
	        }, function(event) {
	            if (currentPage == 0) return;
	            currentPage = currentPage - 1;
	            $table.trigger('repaginate');
	            $($(".page-number")[(currentPage - nowp) + 2]).addClass('on').siblings().removeClass('on');
	        }).appendTo($pager);
            //.addClass('clickable');
	        // [1,2,3,4,5,6,7,8]
	        for (var page = nowp; page < endp; page++) {
	            $('<li><a href="#none" class="page-number" ></a></li>').text(page + 1).on('click', {
	                newPage: page
	            }, function(event) {
	                currentPage = event.data['newPage'];
	                $table.trigger('repaginate');
	                $($(".page-number")[(currentPage - nowp) + 2]).addClass('on').siblings().removeClass('on');
	            }).appendTo($pager);
                //.addClass('clickable');
	        }
	        // [다음]
	        $('<li class="onePagingIcon"><a href="#none" class="page-number" style="display:none"><i class="icon-next"></i></a></li>').on('click', {newPage: page}, function(event) {
	            if (currentPage == numPages - 1) return;
	            currentPage = currentPage + 1;
	            $table.trigger('repaginate');
	            $($(".page-number")[(currentPage - nowp) + 2]).addClass('on').siblings().removeClass('on');
	        }).appendTo($pager);
            //.addClass('clickable');
	        // [끝]
	        $('<li class="onePagingIcon"><a href="#none" class="page-number"><i class="icon-next6"></i></a></li>').on('click', {newPage: page}, function(event) {
	            currentPage = numPages - 1;
	            $table.trigger('repaginate');
	            $($(".page-number")[endp - nowp + 1]).addClass('on').siblings().removeClass('on');
	        }).appendTo($pager);
            //.addClass('clickable');

	        $($(".page-number")[2]).addClass('on');
	    });
	    $pager.insertAfter($table).find('a.page-number:first').next().next().addClass('on');
        $table.parent().append($pager)
	    $(".tableWrap ").append($pager);
	    $table.trigger('repaginate');
	});
}
