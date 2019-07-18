export const THEME = Object.freeze({
	height: {
		header: 64,
		footer: 48,
		historyToolbar: 40,
		emitterToolbar: 40,
		h4Titile: 38,
	},
	margin: {
		mainContent: 8,
		historyList: 8,
	},
	padding: {
		mainContent: 16,
	},
	bg: {
		header: '#ffffff',
		footer: '#ffffff',
		sidebar: '#001529',
		mainContent: '#ffffff',
		panel: '#fafafa',
	},
	text: {
		main: '#1d1d1d',
		hint: '#767676',
		inverted: '#ffffff',
	},
	color: {

	},
	border: {
		history: '#d9d9d9',
		hint: '#00577c',
	},
});

const {
	height: h,
	margin: m,
	padding: p,
} = THEME;

const mainContent      = h.header + h.footer + 2 * m.mainContent;
const historyContainer = mainContent + 2 * p.mainContent;
const historyList      = historyContainer + h.historyToolbar + h.h4Titile + m.historyList;
const leftContainer    = historyContainer;

export const MIN_HEIGHTS = Object.freeze({
	mainContent,
	historyContainer,
	historyList,
	leftContainer,
});
