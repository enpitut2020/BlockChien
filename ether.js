//const { func } = require("prop-types");

const accounts = ethereum.request({ method: 'eth_requestAccounts' });
const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
}
if (ethEnabled()) {
    console.log("true");
}

let mainContract = new window.web3.eth.Contract([
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "borrowBook",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pay",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "update",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "BookInformation",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "User",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "status",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "left",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reserved_num",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pages",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "borrow_date",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "return_date",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "friends",
                        "type": "uint256[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "Year",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "Month",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "Day",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Main.Date",
                        "name": "Bdate",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "Year",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "Month",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "Day",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Main.Date",
                        "name": "Rdate",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Main.Book",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "return_point",
        "outputs": [
            {
                "internalType": "int256",
                "name": "point",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "students",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "today",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userBook",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "UserInformation",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "User",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "int256",
                        "name": "point",
                        "type": "int256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "borrowed_book",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "reserved_book",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastDay",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Main.Student",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
], "0x1a4931Ad581f421f88AceBf6387F97a62EC73C1a");




function Borrow() {
    let title = Borrow_form.textbox.value;  //テキストエリアの値を取得
    if (title == "") { alert("借りる本のタイトルを入力してください。"); }
    else { alert("" + "(" + title + ")" + "を借ります。"); }

    // sendだと
    mainContract.methods.borrowBook(title).call({
        from: "0xc8eDA6054Eb36457dad52C7E734CD282e2a3575A",
    }).then(function (receipt) {
        console.log(receipt);
    });
}

function ReturnBook() {
    let title = Return_form.textbox.value;  //テキストエリアの値を取得
    if (title == "") { alert("返す本のタイトルを入力してください。"); }
    else { alert("" + "(" + title + ")" + "を返します。"); }

    mainContract.methods.returnBook(title).send({
        from: "0xc8eDA6054Eb36457dad52C7E734CD282e2a3575A",
    }).then(function (receipt) {
        console.log(receipt);
    });
}

function getPoint() {
    // update()を実行してポイントを変更
    mainContract.methods.update().send({ from: currentAccount }).then(
        () => {
            // return_pointを実行してポイントを取得
            mainContract.methods.return_point().call({ from: currentAccount })
                .then((point) => {
                    // ReapoRender
                    document.getElementById('point').innerText = "ポイント残高: " + point + "\u00A0\u00A0\u00A0(ポイント受け取り済み)";
                }
                )
        }
    )
}

const pointWeight = 1000000000000000; // 1ポイントあたりのwei

function recoveryPoint() {
    // ダミーポイント
    //let recPoints = 10;
	let recPoints = Number(document.getElementById('recPoint').value);
	if(recPoints > 0) {
		// ポイント <-> Ether の変換
		// 1e15 wei で 1ポイント
		mainContract.methods.pay().send({
			from: currentAccount,
			to: "0x1a4931Ad581f421f88AceBf6387F97a62EC73C1a",
			value: pointWeight * recPoints //wei
		}).then(() => {
			mainContract.methods.return_point().call({ from: currentAccount })
				.then((point) => {
					// ReapoRender
					console.log(point);
					//let count = Math.min(10, point / 10);
					//document.getElementById('point').innerText = "ポイント残高: " + point + "あと" + String(count) + "冊借りられます";
					document.getElementById('point').innerText = "ポイント残高: " + point;
				})
		});
	}
}

function plusPoint() {
    $("#recPoint").val(Number($("#recPoint").val()) + 5);
}

function minusPoint() {
    $("#recPoint").val(Math.max(Number($("#recPoint").val()) - 5, 0));
}

