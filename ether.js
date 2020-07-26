ethereum.request({ method: 'eth_requestAccounts' });
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
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
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
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
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
                "name": "LengthofBookList",
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
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    }
                ],
                "name": "UserInformation",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ], "0x8092BB6F33672B19c5a245A2C28B2a7700f20cBc");

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

        let usr;
        function getUsrInfo() {
            mainContract.methods.UserInformation(1).call().then((res) => {
                for (let ele in res) {

                }
            });
            mainContract.methods.BookInformation(1).call().then((res) => {
                //for (let )
            });
        }