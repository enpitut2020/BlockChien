console.log("0000");
let currentAccount;
let borrowedBookHistory = [];
let reservedBookHistory = [];
let element;
let element2;
web3.eth.getAccounts((error, accounts) => {
    currentAccount = accounts[0];
    mainContract.methods.UserInformation().call({ from: currentAccount }).then(res => {
        console.log(res);

        res["borrowed_book"].reduce((cur, next) => {
            return cur.then(mainContract.methods.BookInformation(Number(next)).call({ from: currentAccount }).then(book => {
                //console.log(book);
                borrowedBookHistory.push({
                    "title": book["name"],
                    "reservedNum": book["reserved_num"],
                    "begin": {
                        "year": book["Bdate"]["Year"],
                        "month": book["Bdate"]["Month"],
                        "day": book["Bdate"]["Day"],
                    },
                    "end": {
                        "year": book["Rdate"]["Year"],
                        "month": book["Rdate"]["Month"],
                        "day": book["Rdate"]["Day"],
                    }
                });
                return book;
            }).then((book) => {
                if (borrowedBookHistory.length == res["borrowed_book"].length) {
                    console.log(borrowedBookHistory);
                    let historyRecords = borrowedBookHistory.map((n, cnt) => {
                        return (
                            <tr id={cnt}>
                                <th>{n.title}</th>
                                <th>{String(n.reservedNum) + "人"}</th>
                                <th>{String(n.begin.year) + "年" + String(n.begin.month) + "月" + String(n.begin.day) + "日"}</th>
                                <th>{String(n.end.year) + "年" + String(n.end.month) + "月" + String(n.end.day) + "日"}</th>
                            </tr>
                        );
                    });

                    console.log(historyRecords);

                    element = (
                        <table class="table">
                            <thead class="thead-lignt">
                                <tr>
                                    <th>タイトル</th>
                                    <th>予約人数</th>
                                    <th>貸し出し日時</th>
                                    <th>返却期限</th>
                                </tr>
                            </thead>
                            {historyRecords}
                        </table>
                    );

                    let remainingDay = 14;
                    // \u00A0 : 空白の文字コード

                    document.getElementById('point').innerText = "ポイント残高: " + res["point"] + "\u00A0\u00A0\u00A0\u00A0(回復まであと" + String(remainingDay) + "日)";
                    ReactDOM.render(element, document.getElementById('home'));

                    /*
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange1">
                        <p>Value: <span id="demo1"></span></p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange2">
                        <p>Value: <span id="demo2"></span></p>
                    </div>
                    */

                    borrowedBookHistory.map((n, cnt) => {
                        //book["pages"]
                        let slider1 = document.createElement('input');
                        slider1.type = "range";
                        slider1.className = "slider";
                        slider1.id = "myRange1";
                        slider1.value = 0;
                        slider1.min = 0;
                        slider1.max = book["pages"];
                        let slider2 = document.createElement('input');
                        slider2.type = "range";
                        slider2.className = "slider";
                        slider2.id = "myRange2";
                        slider2.value = 0;
                        slider2.min = 0;
                        slider2.max = book["pages"];

                        let span1 = document.createElement('span');
                        let wrapP1 = document.createElement('p');
                        wrapP1.innerText = "読んだページ数: ";
                        let span2 = document.createElement('span');
                        let wrapP2 = document.createElement('p');
                        wrapP2.innerText = "読んでおかないといけないページ数: ";
                        span1.id = "demo1_" + String(cnt);
                        span2.id = "demo2_" + String(cnt);
                        wrapP1.appendChild(span1);
                        wrapP2.appendChild(span2);



                        let ele = document.getElementById(String(cnt));
                        let wrapTr = document.createElement('tr');
                        let wrapTh = document.createElement('th');
                        wrapTh.colSpan = "4";
                        let wrapDiv = document.createElement('div');
                        wrapDiv.className = "slidecontainer";
                        wrapDiv.appendChild(slider1);
                        wrapDiv.appendChild(wrapP1);
                        wrapDiv.appendChild(slider2);
                        wrapDiv.appendChild(wrapP2);
                        wrapTh.appendChild(wrapDiv);
                        wrapTr.appendChild(wrapTh);

                        ele.insertAdjacentElement('afterend', wrapTr);

                        span1.innerHTML = slider1.value;
                        slider1.oninput = () => {
                            span1.innerHTML = slider1.value;
                        }

                        span2.innerHTML = slider2.value;
                        slider2.oninput = () => {
                            span2.innerHTML = slider2.value;
                        }
                    })

                    // let slider1 = document.getElementById("myRange1");
                    // let output1 = document.getElementById("demo1");
                    // output1.innerHTML = slider1.value;

                    // slider1.oninput = function () {
                    //     output1.innerHTML = this.value;
                    // }

                    // let slider2 = document.getElementById("myRange2");
                    // let output2 = document.getElementById("demo2");
                    // output2.innerHTML = slider2.value;

                    // slider2.oninput = function () {
                    //     output2.innerHTML = this.value;
                    // }





                }
            }))
        }, Promise.resolve());

        res["reserved_book"].reduce((cur, next) => {
            return cur.then(mainContract.methods.BookInformation(Number(next)).call({ from: currentAccount }).then(book => {
                //console.log(book);
                reservedBookHistory.push({
                    "title": book["name"],
                    "reservedNum": book["reserved_num"],
                    "begin": {
                        "year": book["Bdate"]["Year"],
                        "month": book["Bdate"]["Month"],
                        "day": book["Bdate"]["Day"],
                    },
                    "end": {
                        "year": book["Rdate"]["Year"],
                        "month": book["Rdate"]["Month"],
                        "day": book["Rdate"]["Day"],
                    }
                });
            }).then(() => {
                if (reservedBookHistory.length == res["reserved_book"].length) {
                    console.log(reservedBookHistory);
                    let historyRecords = reservedBookHistory.map((n) => {
                        return (
                            <tr>
                                <th>{n.title}</th>
                                <th>{String(n.reservedNum) + "人"}</th>
                                <th>{String(n.begin.year) + "年" + String(n.begin.month) + "月" + String(n.begin.day) + "日"}</th>
                                <th>{String(n.end.year) + "年" + String(n.end.month) + "月" + String(n.end.day) + "日"}</th>
                            </tr>
                        );
                    });
                    console.log(historyRecords);

                    element2 = (
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
                    ReactDOM.render(element2, document.getElementById('reserve'));
                }
            }))

        }, Promise.resolve());
    })
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

window.onload = () => {

}