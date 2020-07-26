function getUserInfo() {
    // let usrAddress = document.getElementById('usrAddress');
    // let history;
    // let reservation;
    // mainContract.methods.UserInformation(number(usrAddress.value)).call().then((res) => {
    //     history = res[0];
    //     reservation = res[1];
    // });

    // let usrHistory = [];
    // for (let bookNum of history) {
    //     mainContract.methods.BookInformation(bookNum).call().then((res) => {
    //         usrHistory.push({
    //     "title": res[0],
    //     "reservedNum": res[3],
    //     "begin": {
    //         "year": 2020,
    //         "month": 7,
    //         "day": 14
    //     },
    //     "end": {
    //         "year": 2020

    //         ,
    //         "month": 7,
    //         "day": 28
    //     }
    // })
    //     });
    // }




    let usrHistory = [{
        "title": "BlockChain",
        "reservedNum": 3,
        "begin": {
            "year": 2020,
            "month": 7,
            "day": 14
        },
        "end": {
            "year": 2020

            ,
            "month": 7,
            "day": 28
        }
    }, {
        "title": "Mastering Ethereum",
        "reservedNum": 1,
        "begin": {
            "year": 2020,
            "month": 7,
            "day": 16
        },
        "end": {
            "year": 2020,
            "month": 7,
            "day": 30
        }
    }];

    let usrRevervation = [{
        "title": "Cooking for Geeks",
        "reservedNum": 3,
        "begin": {
            "year": 2020,
            "month": 7,
            "day": 16
        },
        "end": {
            "year": 2020,
            "month": 7,
            "day": 30
        }
    }, {
        "title": "アジャイルサムライ-達人開発者への道-",
        "reservedNum": 3,
        "begin": {
            "year": 2020,
            "month": 7,
            "day": 16
        },
        "end": {
            "year": 2020,
            "month": 7,
            "day": 30
        }
    }];

    let usrRecords = usrHistory.map((n) => {
        return (
            <tr>
                <th>{n.title}</th>
                <th>{String(n.reservedNum) + "人"}</th>
                <th>{String(n.begin.year) + "年" + String(n.begin.month) + "月" + String(n.begin.day) + "日"}</th>
                <th>{String(n.end.year) + "年" + String(n.end.month) + "月" + String(n.end.day) + "日"}</th>
            </tr>
        );
    })

    let historyRecords = usrRevervation.map((n) => {
        return (
            <tr>
                <th>{n.title}</th>
                <th>{String(n.reservedNum) + "人"}</th>
                <th>{String(n.begin.year) + "年" + String(n.begin.month) + "月" + String(n.begin.day) + "日"}</th>
                <th>{String(n.end.year) + "年" + String(n.end.month) + "月" + String(n.end.day) + "日"}</th>
            </tr>
        );
    })

    const tableTitle1 = (
        <table class="table">
            <thead class="thead-lignt">
                <h3></h3>
                <tr>
                    <th>タイトル</th>
                    <th>予約人数</th>
                    <th>貸し出し日時</th>
                    <th>返却期限</th>
                </tr>
            </thead>
        </table>
    );

    const tableTitle2 = (
        <table class="table">
            <thead class="thead-lignt">
                <tr>
                    <th>タイトル</th>
                    <th>予約人数</th>
                    <th>受け取り日時</th>
                    <th>返却期限</th>
                </tr>
            </thead>
        </table>
    );

    const element = (
        <table class="table">
            <thead class="thead-lignt">
                <tr>
                    <th>タイトル</th>
                    <th>予約人数</th>
                    <th>貸し出し日時</th>
                    <th>返却期限</th>
                </tr>
            </thead>
            {usrRecords}
        </table>
    );


    const element2 = (
        <table class="table">
            <thead class="thead-lignt">
                <tr>
                    <th>タイトル</th>
                    <th>予約人数</th>
                    <th>受け取り日時</th>
                    <th>返却期限</th>
                </tr>
            </thead>
            {historyRecords}
        </table>
    );

    let usrAddress = document.getElementById('usrAddress');
    //alert(usrAddress.name);
    if (usrAddress.value == "100") {
        //alert("hoge");
        let point = 100;
        let remainingDay = 14;
        // \u00A0 : 空白の文字コード
        document.getElementById('point').innerText = "ポイント残高: " + String(point) + "\u00A0\u00A0\u00A0\u00A0(回復まであと" + String(remainingDay) + "日)";
        ReactDOM.render(element, document.getElementById('home'));
        ReactDOM.render(element2, document.getElementById('reserve'));
    }
    else {
        ReactDOM.render(tableTitle1, document.getElementById('home'));
        ReactDOM.render(tableTitle2, document.getElementById('reserve'));
    }
}

function getBookInfo() {

    let bookInfo = [{ "reservationNum": 10 }];

    //for(book of bookInfo)

    // const element = (

    //     <table class="table">
    //         <thead class="thead-lignt">
    //             <tr>
    //                 <th>タイトル</th>
    //                 <th>予約人数</th>
    //                 <th>返却期限</th>
    //             </tr>
    //         </thead>
    //         <tr>
    //             <th>BlockChain</th>
    //             <th>3人</th>
    //             <th>7月28日</th>
    //         </tr>
    //     </table>

    // );
    // ReactDOM.render(
    //     element,
    //     document.getElementById('menu1')
    // );

}