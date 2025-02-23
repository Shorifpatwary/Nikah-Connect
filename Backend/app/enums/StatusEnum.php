<?php

namespace App\Enums;

class StatusEnum
{
  const BIO_PROFILE_TYPES = ["TOP_MALE", "MID_MALE", "LOW_MALE", "TOP_FEMALE", "MID_FEMALE", "LOW_FEMALE", "SHORT_MALE", "SHORT_FEMALE"];
  const BIO__TYPES = ["LONG", "SHORT", "SHORT_TO_LONG_DRAFT", "SHORT_TO_LONG_APPROVED_REQUEST"];
  const GENDERS = ['পাত্র', 'পাত্রী'];
  const MARITAL_STATUS = ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'সহধর্মীহীন',];
  const COMPLEXIONS = ['কালো', 'শ্যামলা', 'উজ্জ্বল শ্যামলা', 'ফর্সা', 'উজ্জ্বল ফর্সা'];
  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'জানা নেই'];
  const EDUCATION_MEDIUM = ['জেনারেল', 'কাউমি', 'আলিয়া', 'দেশের বাইরে', 'অন্যান্য'];
  const ECONOMIC_STATUS = ["নিম্নবিত্ত", "নিম্ন মধ্যবিত্ত", "মধ্যবিত্ত", "উচ্চ মধ্যবিত্ত", "উচ্চবিত্ত"];

  const PROFESSION_STATUS = ["ব্যবসায়ী", "সরকারী চাকুরী", "বেসরকারী চাকুরী", "প্রবাসী", "শিক্ষক", "শিক্ষার্থী", "ফ্রিল্যান্সার", "ডাক্তার", "কৃষক", "অন্যান্য", "পেশা নেই"];
  const BIO_STATUS = ['incomplete', 'approved', 'pending_approval', 'reject', 'married', 'inactive',];

  const LOCATION_TYPE = ["বিভাগ", "জেলা", "উপজেলা"];
  const ALL_MAZHAB = [
    'হানাফী (সুন্নি)',
    'মালিকি (সুন্নি)',
    'শাফিয়ি (সুন্নি)',
    'হানবালী (সুন্নি)',
    'আহলে হাদিস',
    'জাহিরি (শিয়া)',
    'জাফরি (শিয়া)',
    'যায়দী (শিয়া)'
  ];

  const HEIGHTS = [
    "3.0",
    "3.1",
    "3.2",
    "3.3",
    "3.4",
    "3.5",
    "3.6",
    "3.7",
    "3.8",
    "3.9",
    "3.10",
    "3.11",
    "4.0",
    "4.1",
    "4.2",
    "4.3",
    "4.4",
    "4.5",
    "4.6",
    "4.7",
    "4.8",
    "4.9",
    "4.10",
    "4.11",
    "5.0",
    "5.1",
    "5.2",
    "5.3",
    "5.4",
    "5.5",
    "5.6",
    "5.7",
    "5.8",
    "5.9",
    "5.10",
    "5.11",
    "6.0",
    "6.1",
    "6.2",
    "6.3",
    "6.4",
    "6.5",
    "6.6",
    "6.7",
    "6.8",
    "6.9",
    "6.10",
    "6.11",
    "7.0",
    "7.1",
    "7.2",
    "7.3",
    "7.4",
    "7.5",
    "7.6",
    "7.7",
    "7.8",
    "7.9",
    "7.10",
    "7.11"
  ];

  const WEIGHTS = [
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100",
    "105",
    "110",
    "115",
    "120",
    "125",
    "130",
    "135",
    "140",
    "145",
    "150",
    "160",
    "170",
    "180",
    "190",
    "200"
  ];
}
