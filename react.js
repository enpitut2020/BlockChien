
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
            }).then(() => {
                if (borrowedBookHistory.length == res["borrowed_book"].length) {
                    console.log(borrowedBookHistory);
                    let historyRecords = borrowedBookHistory.map((n) => {
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