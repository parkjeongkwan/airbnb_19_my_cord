var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.member.onCreate();
    },
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        /*var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    }
};
app.member = (() => {
    var onCreate = () => {
        setContentView();
        $('#arrow-box').click(e => {
            e.preventDefault();
            var id = $('#id').val();
            var pass = $('#password').val();
            //console.log('입력된 id, pass : ' + id + ' , ' + pass);

            $.ajax({
                url: "member.json",
                contentType: "text/plain; charset=UTF-8",
                type: 'GET',
                data: {id: id, pass: pass},
                dataType: 'json',
                success: d => {
                    //alert('진입 성공');
                    $.each(d, (i, o) => {
                        /*d=data, i=index, o=object*/
                        if (o.id === id && o.pass === pass) {
                            checkval = true;
                            return false;
                        } else {
                            checkval = false;
                        }
                    });
                    if (checkval === true) {
                        //alert('SUCCESS!! Votre adresse email est : ' + id);
                        app.list.onCreate();
                    } else {
                        alert('FAIL!!');
                        $('#id').val('');
                        $('#password').val('');
                    }
                },
                error: e => {
                    alert('ERROR!!');
                }
            });
        });
    };
    var setContentView = () => {
        $('body').empty().css({
            'background-color': '#009999'
        });
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .css({
                'width': '100%',
                'height': '100%',
                'padding': '5%'
            })
            .html(
                '<header>' +
                '  <div id="back-btn">' +
                '       <span class="arrow arrow-left"></span>' +
                '           <div><span class="pw-guide">비밀번호가 생각나지 않으세요?</span></div>' +
                '  </div>' +
                '  </header>'+
                '  <div id="container"><p>로그인</p></div>'+
                '  <div id="content">' +
                    '  <div class="login-guide">' +
                        '  <span>이메일 주소</span><br>' +
                        '  <input type="text" id="id" class="id" placeholder="ID를 입력하세요"/><br>' +
                    '  </div>' +
                '      <div class="login-guide">' +
                '          <span>비밀번호</span><br>' +
                '          <input type="password" id="password" class="password" placeholder="비밀번호를 입력하세요"/><br>' +
                '      </div>' +
                '  </div>'+
                '<footer>' +
                '   <div id="arrow-box">' +
                '       <div id="arrow-box2">' +
                '           <a id="arrow-a" href="#">' +
                '               <span class="right"></span>' +
                '           </a>' +
                '       </div>' +
                '   </div>' +
                '</footer>'
            );
        $('header')
            .css({
                'position': 'relative',
                'width': '100%',
                'padding':'0'
        });
        $('.arrow')
            .css({
                'box-shadow': '2px -2px 0 0 white inset'
        });
        $('#container')
            .css({
                'font-size': '2.5em',
                'color': 'white',
                'padding': '5px',
                'margin-top': '20px'
            });
        $('footer')
            .css({
                'position': 'absolute',
                'bottom': '1.5em',
                'right': '2.5em'
        });
    }
    return {onCreate: onCreate};
})();
app.list = (() => {
    var onCreate = () => {
        setContentView();
    };
    var setContentView = () => {
        $('body').empty().css({
            'background-color': '#ffffff'
        });
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .html(
                '<div class="nav-bottom-ligne"></div>' +
                '<nav class="navbar">' +
                '   <ul class="navbar-ul">' +
                '       <li><a href="#">추천</a></li>' +
                '       <li><a id="hostel-default" href="#">숙소</a></li>' +
                '       <li><a href="#">트립</a></li>' +
                '   </ul>' +
                '</nav>' +
                '<div id="container">' +
                '  <div id="contents">'
            );
        $('#hostel-default').last().trigger('click');
        $('#contents').css({
            'margin-top': '33px',
            'padding': '10px'
        });
        $.getJSON('list.json',list=>{
            app.session.array("list",list);
            var content='';
            $.each(list,(i,j)=>{
                content +=  '<div id="content'+ i +'" class="list-content">'+
                                '<div id="img-swifer' + i + '" class="main-carousel"></div>'+
                                    '<div class="content-txt">'+
                                    '<span id="content-txt-info">개인실 / 침대 1개</span><br>'+
                                    '<span id="content-txt-title">'+ j.residenceName +'</span><br>'+
                                    '<span id="content-txt-price">￦'+ j.price +' /박</span><br>'+
                                '</div>'+
                            '</div>'
            });
            $('#contents').append(content);
        });
        $.getJSON('list.json',list=>{
            var content='';
            $.each(list,(i,j)=>{
                $('#img-swifer' + i + '').append('<div class="carousel-cell"><img class="list-img" src="' + j.detailImg + '"></div>');
                $('#img-swifer' + i + '').flickity({
                    cellAlign: 'left',
                    contain: true
                });
                /!* css file 분리 안됨 *!/
                $('.flickity-prev-next-button svg').css({
                    'width':'0'
                });
                $('.flickity-prev-next-button').css({
                    'width':'0',
                    'background':'transparent'
                });
                $('.flickity-page-dots').css({
                    'bottom':'0px'
                });
                $('.flickity-page-dots .dot').css({
                    'width':'12px',
                    'height':'12px',
                    'opacity':'1',
                    'background':'transparent',
                    'border':'1px solid white',
                });
                $('.flickity-page-dots .dot.is-selected').css({
                    'background':'white'
                });
                $('#container').css({
                    'text-align': 'center',
                    'margin-top': '5px'
                });
                $('#content' + i + '').click(e => {
                    //console.log('선택한 content ID : ' + i);
                    app.session.init("contentId",i);
                    //console.log("세션에 저장된 해당 컨탠트 아이디 : "+app.session.getSessionData("contentId"));
                    app.detail.onCreate();
                });
            });
        });
    };
    return {onCreate: onCreate};
})();
app.detail = (() => {
    var onCreate = () => {
        setContentView();
        $('#back-btn').click(e => {
            app.list.onCreate();
        });
        $('#res-btn').click(e => {
            app.reservation.onCreate();
        });
    };
    var setContentView = () => {
        $('body')
            .html(
                '<header>' +
                '  <div >' +
                '       <span id="back-btn" class="arrow arrow-left"></span>' +
                '  </div>' +
                '</header>'
            );
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .html(
                '<div id="container">' +
                '   <div id="contents">' +
                '   </div>' +
                '</div>');
        var _list = app.session.getArray("list") ;
        var residence_name = _list[app.session.getSessionData("contentId")].residenceName;
        var resi_content = _list[app.session.getSessionData("contentId")].resiContent;
        var price = _list[app.session.getSessionData("contentId")].price;
        var member_id =  _list[app.session.getSessionData("contentId")].memberId;
        var host_serial = _list[app.session.getSessionData("contentId")].hostSerial;
        console.log('세션 멤버 아이디 : '+member_id);
        console.log('세션 멤버 resiContent : '+resi_content);

        var content =
                    '   <div id="content'+ app.session.getSessionData("contentId") +'">'+
                    '       <div class="detail-title">'+residence_name+'</div>' +
                    '       <div class="detail-content" >개인실<br>호스트: <a href="#">'+member_id+'</a> 님</div>' +
                    '       <div class="detail-content-icon" >' +
                    '           <div class="hostel-icon"><span class="glyphicon glyphicon-user"></span><br>인원1명</div>' +
                    '           <div class="hostel-icon"><span class="glyphicon glyphicon-home"></span><br>원룸</div>' +
                    '           <div class="hostel-icon"><span class="glyphicon glyphicon-bed"></span><br>침대1개</div>' +
                    '           <div class="hostel-icon"><span class="glyphicon glyphicon-tint"></span><br>욕실1개</div>' +
                    '       </div>' +
                    '       <div class="detail-content" >숙소 소개<br>' +
                    '           <div id="info-txt" style="font-size: 10px;font-weight: normal;">'+resi_content+'</div>' +
                    '           <div class="detail-footer"><p>￦'+price+'/1박</p>' +
                    '           <button id="res-btn" class="res-btn">예약 가능 여부 확인</button></div>' +
                    '       </div>' +
                    '   </div>'
        $('#contents').append(content);
        $('#contents').before(app.compUI.image('detail-img', _list[app.session.getSessionData("contentId")].detailImg));
        $('#detail-img').addClass('detail-img');
        $('#info-txt').append('<div id="gmap" style="margin: 30px;height: 200px;"></div>');
        $("#gmap").load("map4.html");
    };
    return {onCreate: onCreate};
})();
app.reservation = (() => {
    var onCreate = () => {
        setContentView();
        $('#back-btn').click(e => {
            app.detail.onCreate();
        });
        $('#res-btn').click(e => {
            if( $('#start-date').text()==='') {
                alert('체크인 날짜를 선택해 주세요');
            }else if($('#end-date').text()===''){
                alert('체크아웃 날짜를 선택해 주세요');
            }else{
                app.confirm.onCreate();
            }
        });
        $('#date-refresh').click(e=>{
            app.reservation.onCreate();
        });
    };
    var setContentView = () => {
        $('body')
            .html(
                '<header>'+
                '   <div  style="width: 27px">' +
                '       <span id="back-btn" class="arrow arrow-left"></span>' +
                '       <div id="date-refresh" class="header-guide"><span>삭제</span></div>' +
                '   </div>' +
                '</header>'
            );
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .html('<div id="container">' +
                '   <div id="contents">' +
                '       <div id="pick-date-bar">' +
                '           <div id="start-date"></div>' +
                '           <div id="end-date" ></div><br>' +
                '       </div>' +
                '       <div id="calendar">' +
                '           <div id="my-element" data-language="korea" class="datepicker-here" data-multiple-dates-separator=" - "></div>' +
                '       </div>' +
                '       <div class="detail-footer" style="position: fixed;">' +
                '           <p id="count-selected"></p>' +
                '           <button id="res-btn" class="res-btn">예약 하기</button>' +
                '       </div>'+
                '   </div>'+
                '</div>');
        $('#contents')
            .css({
                'margin-top': '15%'
            });
        var startDate, endDate = '';
        $('#my-element').datepicker({
            minDate: new Date(),
            range: true,
            onSelect: function (fd, d, picker) {
                console.log('d값:  '+d);
                console.log('fd값:  '+fd);
                function formatDate(date) {
                    var week = new Array('일', '월', '화', '수', '목', '금', '토');
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1) + '월',
                        date = '' + d.getDate() + '일';
                    var todayArray = d.getDay();
                    var day = week[todayArray] + '요일';
                    if (month.length < 2) month = '0' + month;
                    if (date.length < 2) date = '0' + date;
                    return [month, date, day].join(' ');
                }
                startDate = formatDate(d[0]);
                endDate = formatDate(d[1]);

                $('#start-date').text(startDate);
                if (d.length == 1) {
                    $('#end-date').text("");
                } else {
                    $('#end-date').text(endDate);
                }
                if (fd == "") {
                    $('#start-date').text("");
                    $('#end-date').text("");
                }
                app.session.init("start_date",startDate);
                app.session.init("end_date",endDate);

                function formatDateForCount(date) {
                    var d = new Date(date),
                        year = d.getFullYear();
                    month = '' + (d.getMonth() + 1),
                        date = '' + d.getDate();
                    if (month.length < 2) month = '0' + month;
                    if (date.length < 2) date = '0' + date;
                    return [year, month, date].join('-');
                }
                var startString = formatDateForCount(d[0]);
                var endString = formatDateForCount(d[1]);
                var startArray = startString.split('-');
                var endArray = endString.split('-');
                var start = new Date(startArray[0], Number(startArray[1]) - 1, startArray[2]);
                var end = new Date(endArray[0], Number(endArray[1]) - 1, endArray[2]);
                var btwcount = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;

                app.session.init("start_string",startString);
                app.session.init("end_string",endString);

                if (isNaN(btwcount)) {
                    $('#count-selected').text('');
                    return false;
                } else {
                    $('#count-selected').text(btwcount + '박을 선택했습니다.');
                }

                var _list = app.session.getArray("list");
                var price = _list[app.session.getSessionData("contentId")].price;
                var total_price = btwcount * price;
                app.session.init("btwcount",btwcount);
                app.session.init("total_price",total_price);
            }
        });
    };
    return {onCreate: onCreate};
})();
app.confirm = (() => {
    var onCreate = () => {
        setContentView();
        $('#back-btn').click(() => {
            app.reservation.onCreate();
        });
        $('#res-btn').click(() => {
            app.pay.onCreate();
        });
    };
    var setContentView = () => {
        var _list = app.session.getArray("list") ;
        var regidence_name = _list[app.session.getSessionData("contentId")].residenceName;
        var regi_content = _list[app.session.getSessionData("contentId")].regiContent;
        var price = _list[app.session.getSessionData("contentId")].price;
        var total_count = app.session.getSessionData("btwcount");
        var total_price = app.session.getSessionData("total_price");
        var start_date = app.session.getSessionData("start_date");
        var end_date = app.session.getSessionData("end_date");
        $('body')
            .html(
                '<header>' +
                '   <div>' +
                '       <span id="back-btn" class="arrow arrow-left"></span>' +
                '       <div><h2>확인 및 결제</h2></div>' +
                '   <div style="margin-bottom: 20px;margin-top: 15%;">' +
                '       <h5>'+regidence_name+'<br>' +
                '       '+start_date+' - '+end_date+', 게스트 1명' +
                '       </h5>' +
                '   </div>' +
                '   <div style="border-bottom:1px solid grey">' +
                '   <img style="width:40px;" src="https://maxcdn.icons8.com/Share/icon/dotty/Finance//mastercard1600.png" alt="">' +
                '   Mastercard 3164 ' +
                '   </div>' +
                '   <div>' +
                '       <div style="width:100%;height:150px;border-bottom:1px solid grey;">' +
                '           <div style="width: 40%;float: left;">' +
                '               <div><h4 style="font-size: 15px;">￦'+price+' x '+total_count+'박</h4></div>' +
                '               <div><h4 style="font-size: 15px;">서비스 수수료</h4></div>' +
                '               <div><h4 style="font-size: 15px;">총 합계</h4></div>' +
                '           </div>' +
                '           <div style="width: 30%;float:left; text-align: right; margin-left: 30%;">'+
                '               <div><h4 style="font-size: 15px;">￦'+total_price+'</h4></div>' +
                '               <div><h4 style="font-size: 15px;">￦0</h4></div>' +
                '               <div><h4 style="font-size: 15px;">￦'+total_price+'</h4></div>' +
                '           </div>' +
                '       </div>' +
                '   <div>' +
                '  <h6>' +
                '     체크인 24시간 전까지 예약을 취소하면 전액 환불됩니다. 그 이후 체크인 전에 취소하면 첫 1박 요금은 환불되지 않습니다.<br>' +
                '      </h6>' +
                '</div>' +
                '<div>' +
                '  <h6>' +
                '    숙소 이용규칙, 환불정책, 게스트 환불 정책에 동의합니다. 서비스 수수료를 포함하여 표시된 총액을 지불하는 것이도 동의합니다.<br>' +
                '      </h6>' +
                '</div>' +
                '</span>' +
                '   </div>' +
                '</header>'
            );
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .html(
                '<div id="container" style="padding: 20px;margin-top: 60px;"></div>'+
                '<button id="res-btn" class="res-btn">&nbsp; 예약 하기 · ￦'+total_price+' &nbsp;</button>'
            );
    };
    return {onCreate: onCreate};
})();
app.pay = (() => {
    var onCreate = () => {
        setContentView();
        $('#cancle-btn').click(e => {
            app.confirm.onCreate();
        });
        $('#submit-btn').click(e => {
            var _list = app.session.getArray("list") ;
            var host_serial = _list[app.session.getSessionData("contentId")].hostSerial;
            var member_id = _list[app.session.getSessionData("contentId")].memberId;
            var regidence_name = _list[app.session.getSessionData("contentId")].residenceName;
            var regi_content = _list[app.session.getSessionData("contentId")].regiContent;
            var price = _list[app.session.getSessionData("contentId")].price;
            var total_count = app.session.getSessionData("btwcount");
            var total_price = app.session.getSessionData("total_price");
            var start_string = app.session.getSessionData("start_string");
            var end_string = app.session.getSessionData("end_string");

            var data = {
                //checkin, chechout, regdate, adult, teen, child, solddays, hostSerial, memberId, resPrice
                "checkin":start_string,
                "chechout":end_string,
                "adult":"1",
                "hostSerial":host_serial,
                "memberId":member_id,
                "total_price":total_price
            };
            if(app.valid.emialChecker($('#mailBuyer').val())==='yes'){
                if($('#noCard1').val()==''){
                    alert('카드 번호를 입력해주세요');
                }else if($('#noCard2').val()==''){
                    alert('카드 번호를 정확히 입력해주세요');
                }else if(app.valid.cardNumberChecker($('#noCard1').val()*1)){
                    if(app.valid.cardNumberChecker($('#noCard2').val()*1)){
                        app.approved.onCreate();
/*                        $.ajax({
                            url :ctx+'/get/login',
                            method : 'POST',
                            data  : data ,
                            contentType : 'application/json',
                            success : d=>{
                                alert(d.msg);
                                app.approved.onCreate();
                            },
                            error : (x,s,m)=>{
                                alert( '통신에러발생 : ' + m );
                            }
                        });*/
                    }else{
                        alert('카드 번호를 정확히 입력해 주세요');
                    }
                }else{
                    alert('숫자만 입력 가능');
                    $('#noCard1').val('');
                }
            }else{
                alert('이메일 주소를 확인해주세요.');
                $('#mailBuyer').val('');
            }
            e.preventDefault();
        });
    };
    var setContentView = () => {
        $('body').empty();
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $('#wrapper')
            .html(
                '<div id="container">' +
                '</div>');
        $('#container')
            .html('<table style="width:400px; padding:0 20px 0 20px;"></table>' +
                '<table style="width:400px;margin: 20px 5px;">' +
                '    <tbody>' +
                '        <tr>' +
                '            <td style="height:5px; background:#862990;"></td>' +
                '        </tr>' +
                '    </tbody>' +
                '</table>' +
                '<!---- header text ---->' +
                '<table style="width:400px; margin-top:15px;">' +
                '    <tbody>' +
                '        <tr>' +
                '            <td style="font-size:12px; height:30px; font-weight:bold; padding:0 20px 0 20px;">' +
                '                입력하신 <font style="text-decoration: underline;">TID</font>가 유효하지 않습니다.(40자리)' +
                '            </td>' +
                '        </tr>' +
                '    </tbody>' +
                '</table>' +
                '<!---- tab ---->' +
                '<span name="tab1" code="0" style="    margin-left: 5%; width: 30%;" class="tab1_on">' +
                '  이메일 + 카드번호</span>' +
                '<span name="tab1" code="3" style="width: 30%;" class="tab1_off">' +
                '  휴대폰번호 + 금액</span>' +
                '<span name="tab1" code="1" style="width: 30%;" class="tab1_off">' +
                '  구매자명 + 금액</span>' +
                '<!---- input field ---->' +
                '<table id="inpTab0" code="0" style="margin-top: 50px; margin-left: 30px; display: table;">' +
                '    <tbody>' +
                '        <tr>' +
                '            <th style="font-size:12px; text-align:left; padding-right:10px;">이메일</th>' +
                '            <td>' +
                '                <input type="text" id="mailBuyer" name="mailBuyer" value="bombabychu@gmail.com" style="height:26px; color:#777777; padding:5px; border:1px solid #999999; width:250px;">' +
                '            </td>' +
                '        </tr>' +
                '        <tr>' +
                '            <th style="font-size:12px; text-align:left; padding-right:10px;">카드번호</th>' +
                '            <td>' +
                '                <table><tbody>' +
                '                        <tr id="haha">' +
                '                        <td><input type="text" id="noCard1" name="noCard1" value="1234" maxlength="4" class="max4" code="1" style="height:26px; color:#777777; padding:5px; border:1px solid #999999; width:62px;"></td>' +
                '                        <td><b>-</b></td>' +
                '                        <td><input type="text" id="noCard2" name="noCard2" value="5678" maxlength="4" class="max4" code="max" style="height:26px; color:#777777; padding:5px; border:1px solid #999999; width:62px;"></td>' +
                '                        <td><b>- XXXX - XXXX</b></td>' +
                '                        </tr>' +
                '                </tbody></table>' +
                '            </td>' +
                '        </tr>' +
                '    </tbody>' +
                '</table>' +
                '<!---- button ---->' +
                '<table style="width:360px; margin-top:20px;">' +
                '    <tbody><tr style="text-align:center;">' +
                '        <td height="30px">' +
                '            <span id="submit-btn" style="background:#862990; padding:7px 20px 7px 20px; font-size:12px; color:#FFFFFF; text-align:center; cursor: pointer;">확 인</span>' +
                '            <span id="cancle-btn" style="background:#862990; padding:7px 20px 7px 20px; font-size:12px; color:#FFFFFF; text-align:center; cursor: pointer;">취 소</span>' +
                '        </td>' +
                '    </tr>' +
                '    </tbody>' +
                '</table>' +
                '<!---- description ---->' +
                '<table style="width: 95%; margin-top:30px; padding:10px; border:1px solid #CCCCCC;margin: 40px 0px 4px 10px;">' +
                '    <tbody>' +
                '    <tr>' +
                '        <td style="font-size:12px; color:#862990; font-weight:bold; border-bottom:1px solid #CCCCCC; height:20px;">' +
                '            ※ 입력 팁! 알아두면 편리합니다.' +
                '        </td>' +
                '    </tr>' +
                '    <tr>' +
                '        <td>' +
                '        <table id="txtTab0" style="display: table;" code="0" class="displayView">' +
                '            <tbody><tr>' +
                '                <td style="font-size:12px; color:#666666; padding-top:10px;">' +
                '            <span>' +
                '              <font style="font-weight:bolder;">"이메일"</font><br>' +
                '              결제 요청 시 자동(입력) 또는 직접 입력한 이메일 정보를 정확히 입력<br>' +
                '              도메인을 포함한 전체 e-mail 주소를 입력<br>' +
                '              &gt; 가령 "abc@abc.com" 주소의 경우, "abc"만 입력하는 경우는 올바르지 않습니다.' +
                '            </span>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td style="font-size:12px; color:#666666; padding-top:5px;">' +
                '              <span>' +
                '                <font style="font-weight:bolder;">"카드번호"</font><br>' +
                '                결제한 카드번호 앞 8자리를 입력' +
                '              </span>' +
                '                </td>' +
                '            </tr>' +
                '            </tbody>' +
                '        </table>' +
                '        </td>' +
                '    </tr></tbody></table>' +
                '<table style="width:400px; margin: 20px 5px;">' +
                '    <tbody><tr><td style="height:3px; background:#862990;"></td>' +
                '    </tr></tbody></table>')
            .css({
                'width': '100%',
                'margin-top': '20%'
            });
    };
    return {onCreate: onCreate};
})();
app.valid = {
    emialChecker : x => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(x)? "yes" : "no";
    },
    cardNumberChecker : x=> {
        return typeof x === 'number' && isFinite(x);
    }
};
app.approved = (() => {
    var onCreate = () => {
        setContentView();
        $('#res-btn').click(e=>{
            app.list.onCreate();
        });
    };
    var setContentView = () => {
        var _list = app.session.getArray("list") ;
        var member_id =  _list[app.session.getSessionData("contentId")].memberId;
        var addr =  _list[app.session.getSessionData("contentId")].addr;
        $('body').empty();
        $('body').css({
            'background-color': '#009999',
            'text-shadow': '0 0px 0 #f3f3f3',
            'text-align':'left'
        });
        $('<div></div>').attr('id', 'wrapper').appendTo('body');
        $
        $('#wrapper')
            .css({
                'width': '100%',
                'height': '100%',
                'padding': '5%'
            })
            .html('<header style="text-align:left;color:white;position: fixed; left: 0px;">' +
                '  <div style="min-width: 300px;">' +
                '<h3 class="type-it">'+member_id+'님,<br> 안녕하세요!</h3>' +
                '  <p style="font-size: 25px;text-align: left;">' +
                '       새로운 숙소에서 편안한<br>' +
                '       시간 보내시길 바랍니다.<br>' +
                '       주소: '+addr+'' +
                '  </p>' +
                ' <div class="detail-footer" style="width: 100%;' +
                '    height: 70px;' +
                '    background-color: white;' +
                '    bottom: 0px;' +
                '    position: fixed;' +
                '    left: 0px;"><p style="font-size: 9px;color: #ff4f54">※예약확인은 웹사이트에서 확인바랍니다.</p><button id="res-btn" class="res-btn">리스트로 이동</button></div>' +
                '</header>'
            );
        $('.type-it').typeIt({
            content : ' '+member_id+'님, 안녕하세요!',
            loop: true,
            loopDelay: 5000
        });
    };
    return {onCreate: onCreate};
})();
app.session={
    array :(k,v)=>{
        sessionStorage.setItem(k, JSON.stringify(v));
    },
    getArray : k=>{
        return JSON.parse(sessionStorage.getItem(k));
    },
    init : (k,v) => {
        sessionStorage.setItem(k,v);
    },
    getSessionData : k => {
        return sessionStorage.getItem(k);
    }
};
app.cookie = {
    setCoockie: (k, v) => {
        document.cookie = k + "=" + v;
    },
    getCookie: k => {
        var x = k + "=";
        var i = 0;
        var arr = document.cookie.split(';');
        for (i = 0; i < arr.length; i++) {
            var j = arr[i];
            while (j.charAt(0) == '') {
                j = j.substring(1, j.length)
            }
            if (j.indexOf(x) == 0) {
                return j.substring(x.length, j.length);
            }
            return null;
        }
    },
    removeCookie: k => {
    }
};
app.compUI = {
    br: () => {
        return $('<br/>');
    },
    div: x => {
        return $('<div/>', {id: x});
    },
    h1: x => {
        return $('<h1/>', {id: x});
    },
    span: x => {
        return $('<span/>', {id: x});
    },
    iTxt: x => {
        return $('<input/>', {id: x, type: 'text'});
    },
    aBtn: x => {
        return $('<a/>', {href: '#', role: 'button', id: x});
    },
    iBtn: x => {
        return $('<input/>', {id: x, type: 'button'});
    },
    image: (x, y) => {
        return $('<img/>', {id: x, src: y});
    },
    input: (x, y) => {
        return $('<input/>', {id: x, type: y});
    },
    btn: x => {
        return $('<button>', {id: x});
    },
    nav: x => {
        return $('<nav/>', {id: x});
    },
    ul: x => {
        return $('<ul/>', {id: x});
    },
    li: () => {
        return $('<li/>');
    },
    a: () => {
        return $('<a/>', {href: '#'});
    }
};
$(()=> {
    app.initialize();
});
app.initialize();