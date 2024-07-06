const express = require("express");
const mongoose = require("mongoose");
const CommunityModel = require("../models/Community");

const seedCommunity = async (req, res) => {
  try {
    await CommunityModel.deleteMany({});
    await CommunityModel.create([
      {
        _id: "6688f54a5f820ebfa4469e3a",
        communityname: "Dota",
        genre: "mmo",
        information: "we play dota",
      },
      {
        _id: "6688f89e008ac248d836d965",
        communityname: "Warcraft",
        genre: "action",
        information: "warcraft !!! ",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const allCommunities = await CommunityModel.find();
    res.json(allCommunities);
  } catch (error) {
    res.json({ status: error, msg: "error getting communities" });
  }
};

const createCommunity = async (req, res) => {
  try {
    const newCommunity = new CommunityModel({
      communityname: req.body.communityname,
      genre: req.body.genre,
      information: req.body.information,
    });
    await newCommunity.save();
    res.json({ newCommunity, status: "ok", msg: "community created" });
  } catch (error) {
    res.json({ status: error, msg: "error creating community" });
  }
};

const deleteCommunityById = async (req, res) => {
  try {
    await CommunityModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "community deleted" });
  } catch (error) {
    res.json({ status: error, msg: "error deleting community" });
  }
};

const updateCommunityById = async (req, res) => {
  try {
    const updateCommunity = {};
    if (req.body?.communityname)
      updateCommunity.communityname = req.body.communityname;
    if (req.body?.genre) updateCommunity.genre = req.body.genre;
    if (req.body?.information)
      updateCommunity.information = req.body.information;
    await CommunityModel.findByIdAndUpdate(req.params.id, updateCommunity);
    res.json({ status: "ok", msg: "community updated" });
  } catch (error) {
    res.json({ status: error, msg: "error updating community" });
  }
};

module.exports = {
  seedCommunity,
  getAllCommunities,
  createCommunity,
  deleteCommunityById,
  updateCommunityById,
};
