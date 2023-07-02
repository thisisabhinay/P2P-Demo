// Import stylesheets
import "./style.css"

// Write Javascript code!
const peers = []

const connect = (peer) => peers.push(peer)

const sendMessage = (message, peer) => peer.send(message)

const recieveMessage = (message) =>
    (document.getElementById("message-container").innerHTML +=
        message + "<br/>")

window.addEventListener("load", () => {
    const peerConnection = new RTCPeerConnection()
    peerConnection.oniceconnectionstatechange = () => {
        if (peerConnection.iceConnectionState === "connected") {
            alert("Connection Established")
        }
    }

    peerConnection.onmessage = (event) => recieveMessage(event.data)

    peerConnection.addIceCandidate = (candidate) =>
        peers.forEach((peer) => peer.addIceCandidate(candidate))

    document
        .getElementById("connect-button")
        .addEventListener("click", () => peerConnection.connect())

    document.getElementById("send-button").addEventListener("click", () => {
        const message = document.getElementById("message-input").value
        sendMessage(message, peerConnection)
    })
})
