// 输出目录
function createElement(ele, content, parent, id) {
    const tmp_ele = document.createElement(ele);
    tmp_ele.innerHTML = content;
    if (id != undefined) {
        tmp_ele.id = id;
    } else {
        tmp_ele.removeAttribute(id);
    }
    parent.appendChild(tmp_ele);
}

(function () {
    // 创建大标题和内容分区
    const content = document.querySelector("#content");
    createElement("h1", "目录", content);
    createElement("section","", content,"con_sec");
    // 子标题计数器
    let cnt1,
        cnt2 = 0;
    let cnt3 = 1;

    for (const i in ISM) {
        if (Object.hasOwnProperty.call(ISM, i)) {
            const ism = ISM[i];
            if (ism.no.length == 7) {
                cnt1 = 0;
                createElement(
                    "tr",
                    `
                    <td>${ism.no}</td>
                    <td><a href="${ism.link}">${ism.cn}<br><nobr>${ism.en}</nobr></a></td>
                    <td>${ism.ppl}</td>
                    <td>${ism.cul}</td>
                    <td>${ism.desc}</td>
                `,
                document.querySelector(`table#_${ism.no.slice(0, 5)}>tbody`)
                );
                
            } else if (ism.no.length == 5) {
                // 设置子标题
                cnt1 = 0;
                if (cnt2 % 4 == 0) {
                    let index = (ism.no[0] - 1) * 85 + cnt3;
                    createElement("h3", `${ISM[index].cn}`, con_sec);
                    cnt3 += 1;
                }
                createElement(
                    "table",
                    `
                    <tr>
                        <td>${ism.no}</td>
                        <td><a href="${ism.link}">${ism.cn}<br><nobr>${ism.en}</nobr></a></td>
                        <td>${ism.ppl}</td>
                        <td>${ism.cul}</td>
                        <td>${ism.desc}</td>
                    </tr>
                `,
                    con_sec,
                    `_${ism.no}`
                );
                cnt2 += 1;
            } else if (ism.no.length == 3) {
                // 设置子标题
                if (cnt1 == 0) {
                    let index = (ism.no[0] - 1) * 85;
                    createElement(
                        "table",
                        `
                            <tr>
                                <td>${ISM[index].no}</td>
                                <td><a href="${ISM[index].link}">${ISM[index].cn}<br><nobr>${ISM[index].en}</nobr></a></td>
                                <td>${ISM[index].ppl}</td>
                                <td>${ISM[index].cul}</td>
                                <td>${ISM[index].desc}</td>
                            </tr>
                        `,
                        con_sec,
                        `_${ISM[index].no}`
                    );
                    cnt1 = 1;
                }
                createElement(
                    "tr",
                    `
                        <td>${ism.no}</td>
                        <td><a href="${ism.link}">${ism.cn}<br><nobr>${ism.en}</nobr></a></td>
                        <td>${ism.ppl}</td>
                        <td>${ism.cul}</td>
                        <td>${ism.desc}</td>
                    `,
                    document.querySelector(`table#_${ism.no[0]}>tbody`)
                );
            } else {
                cnt1 = 0;
                cnt3 = 1;
                createElement("h2", `${ism.cn}`, con_sec);
            }
        }
    }

    // 隐藏注释<sup>
    const SUP_GRP = document.querySelectorAll("sup");
    for (let i = 0; i < SUP_GRP.length; i++) {
        const SUP = SUP_GRP[i];
        let txt = SUP.innerText;
        SUP.innerText = "";
        SUP.parentElement.classList.add('detail');
        SUP.parentElement.title = txt;
    }
})();
