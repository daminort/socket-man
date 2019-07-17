let socket = null;

const elements = {
	headForm      : null,
	serverAddress : null,
	queryParams   : null,
	connect       : null,
}

const socketParams = {
	connected: false,
};

document.addEventListener('DOMContentLoaded', function() {

	init();

});

// Service ----------------------------------------------------------------------------------------
function init() {
	elements.headForm      = document.getElementById('headForm');
	elements.serverAddress = document.getElementById('serverAddress');
	elements.queryParams   = document.getElementById('queryParams');
	elements.connect       = document.getElementById('connect');
	elements.history       = document.getElementById('history');

	elements.headForm.addEventListener('submit', onSubmit);
	elements.connect.addEventListener('click', onClickConnect);
}

function addEvent(type, body) {

	const mDate = document.createElement('div');
	mDate.classList.add('date');
	mDate.innerText = new Date().toLocaleString('en-GB-u-h24');

	const mType = document.createElement('div');
	mType.classList.add('type');
	mType.innerText = type;

	const mStats = document.createElement('div');
	mStats.classList.add('stats');
	mStats.appendChild(mType);
	mStats.appendChild(mDate);

	const mText = document.createElement('div');
	mText.classList.add('text');
	mText.innerText = JSON.stringify(body);

	const mMessage = document.createElement('div');
	mMessage.classList.add('message');
	mMessage.appendChild(mText);
	mMessage.appendChild(mStats);

	elements.history.appendChild(mMessage);
}

// Events -----------------------------------------------------------------------------------------
function onSubmit(event) {
	event.preventDefault();

}

function onClickConnect(event) {
	event.preventDefault();
	if (socketParams.connected && socket) {
		socket.disconnect();
		onSocket(false);
		return;
	}

	const options = {
		query: elements.queryParams.value,
	}

	try {
		socket = io(elements.serverAddress.value, options);

		const onEvent = socket.onevent;
		socket.onevent = function (packet) {
			const args = packet.data || [];
			onEvent.call(this, packet);    // original call
			packet.data = ["*"].concat(args);
			onEvent.call(this, packet);    // additional call to catch-all
		};

		socket.on("*", function(type, body) {
			addEvent(type, body);
		});

		onSocket(true);

	} catch (e) {
		console.error('Cannot connect to socket server');
		console.error(e);
	}
}

function onSocket(connected) {
	if (!connected) {
		socketParams.connected = false;
		socket = null;

		elements.connect.innerHTML = 'Connect';
		elements.connect.classList.remove('red');
		elements.connect.classList.add('green');

		return;
	}

	socketParams.connected = true;

	elements.connect.innerHTML = 'Disconnect';
	elements.connect.classList.remove('green');
	elements.connect.classList.add('red');
}
