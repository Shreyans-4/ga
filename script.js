body {
    margin: 0;
    text-align: center;
    background: linear-gradient(140deg, #ffdaec, #fff);
    font-family: "Poppins", sans-serif;
}

.title {
    margin-top: 20px;
    color: #ff5890;
    font-size: 2.4em;
}

.subtitle {
    color: #444;
    margin-bottom: 10px;
}

#game {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(255,100,150,0.25);
}

#message-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
}

.hidden { display: none; }

.modal-content {
    width: 350px;
    background: white;
    padding: 25px;
    border-radius: 10px;
    text-align: center;
    animation: fadeIn 0.4s ease;
}

#close-btn {
    margin-top: 15px;
    padding: 10px 22px;
    background: #ff5890;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
