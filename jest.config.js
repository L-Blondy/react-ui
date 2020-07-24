module.exports = {
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/ignoreFiles.js",
		"\\.(svg|png|jpg|css|scss)$": "identity-obj-proxy",
		"^#(.*)": "<rootDir>/src/$1",
		"^/(.*)": "<rootDir>/public/$1",
	},
	"setupFilesAfterEnv": [ "@testing-library/jest-dom/extend-expect" ]
};
