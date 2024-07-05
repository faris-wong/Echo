const express = require("express");
const mongoose = require("mongoose");
const ProfileModel = require("../models/Profile");
const AuthModel = require("../models/Auth");


const seedProfile = async (req, res) => {
  try {
    await ProfileModel.deleteMany({});
    await ProfileModel.create([
      {
        _id: "6687bfaafaf865778c9605e2",
        username: "Ash",

        bio: "hi my name is",
        status: "Online",
        community: "",
      },
      {
        _id: "6687c021922a0938269aa6ea",
        username: "Vick",

        bio: "hello friend",
        status: "AFK",
        community: "",
      },
      {
        _id: "66881e021de112745700a249",
        username: "Chang Peng",

        bio: "lfg",
        status: "In-game",
        community: "",
      },
    ]);
    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await ProfileModel.find().populate(
      "accountlink",
      "username"
    );
    res.json(allProfiles);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error fetching profiles" });
  }
};

// search profile by info
const getProfileByInfo = async (req, res) => {
  const ProfileInfo = {};
  if (req.body?.id) ProfileInfo.id = req.body.id;
  if (req.body?.username) ProfileInfo.username = req.body.username;
  if (req.body?.community) ProfileInfo.community = req.body.community;

  try {
    const allProfiles = await ProfileModel.find(ProfileInfo);
    res.json(allProfiles);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error fetching profiles" });
  }
};

const createProfile = async (req, res) => {
  try {
    const profile = await AuthModel.findOne({ _id: req.params.id });
    const newProfile = {
      username: req.body.username,
      accountlink: profile._id,
    };
    const newProfileModel = new ProfileModel(newProfile);
    await newProfileModel.save();
    res.json({ status: "ok", msg: "profile created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating profile" });
  }
};

const deleteProfileById = async (req, res) => {
  try {
    await ProfileModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "profile deleted" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error deleting profile" });
  }
};

const updateProfileById = async (req, res) => {
  try {
    const updateProfile = {};
    if (req.body?.username) updateProfile.username = req.body.username;
    if (req.body?.bio) updateProfile.bio = req.body.bio;
    if (req.body?.status) updateProfile.status = req.body.status;
    if (req.body?.community) updateProfile.community = req.body.community;

    await ProfileModel.findByIdAndUpdate(req.params.id, updateProfile);
    res.json({ status: "ok", msg: "profile updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error updating profile" });
  }
};

module.exports = {
  seedProfile,
  getAllProfiles,
  getProfileByInfo,
  createProfile,
  deleteProfileById,
  updateProfileById,
};
