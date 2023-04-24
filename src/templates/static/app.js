console.log("hello");

const URL = "https://api.yogveda.live";

let clickHandler = async () => {
    let content = document.getElementById("post-input").value;
    console.log(content);
    if (content === "") {
        console.log("content empty!");
        return;
    }

    let client_id = "77270lc9p0hmuz";
    let redirect_uri = "https://www.yogveda.live";
    let response_type = "code";
    let scope = "w_member_social";

    let authorization_code = "out";

    let state = "DCEeFWf45A53sdfKef424";

    await fetch(URL + `/app/linkedin/oauth/access/initiate`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,PUT,POST,PATCH,OPTIONS",
            access_token: getCookie("access_token"),
        },
    })
        .then((res) => {
            let x = res.json();
            console.log(x);
            return x;
        })
        .then((data) => {
            console.log(data);
            document.getElementById("response").value = data.toString();
        });
};

let loginHandler = () => {
    console.log("login");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let body = {
        user_id: email,
        password: password,
    };

    console.log(JSON.stringify(body));

    fetch("https://api.yogveda.live/v1/login", {
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.cookie = "access_token=" + data.access_token;
        });
};

document.getElementById("login-button").addEventListener("click", loginHandler);

function intiatePostingOnLinkedin() {
    // requirement who is the user ?
    // auth service from jwt token
    // if the user token is not present
    // get token
    // finally post on linkedin
    // or schedule post for later.
}

document.getElementById("post-button").addEventListener("click", clickHandler);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
