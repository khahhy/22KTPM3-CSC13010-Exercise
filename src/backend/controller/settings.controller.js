const { loadSettings, saveSettings } = require("../model/settings.model");

function getSettings(req, res) {
    const settings = loadSettings();
    res.json(settings);
}

function updateSettings(req, res) {
    const newSettings = req.body;
    saveSettings(newSettings);
    res.json({ message: "Cập nhật cài đặt thành công", settings: newSettings });
}

module.exports = { getSettings, updateSettings };
