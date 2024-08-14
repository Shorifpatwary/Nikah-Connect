<?php

namespace App\Enums;

class StatusEnum
{
  const GENDERS = ['পাত্র', 'পাত্রী'];
  const MARITAL_STATUS = ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'বিধবা', 'বিপত্নিক'];
  const COMPLEXIONS = ['কালো', 'শ্যামলা', 'উজ্জ্বল শ্যামলা', 'ফর্সা', 'উজ্জ্বল ফর্সা'];
  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'জানা নেই'];
  const EDUCATION_MEDIUM = ['জেনারেল', 'কাউমি', 'আলিয়া', 'দেশের বাইরে', 'অন্যান্য'];
  const ECONOMIC_STATUS = ["নিম্নবিত্ত", "নিম্ন মধ্যবিত্ত", "মধ্যবিত্ত", "উচ্চ মধ্যবিত্ত", "উচ্চবিত্ত"];
  const BIO_STATUS = ['incomplete', 'approved', 'pending_approval', 'reject', 'married', 'inactive',];

  const ALL_MAZHAB = [
    'হানাফী (সুন্নি)',
    'মালিকি(সুন্নি)',
    'শাফিয়ি (সুন্নি)',
    'হানবালী (সুন্নি)',
    'জাহিরি (শিয়া)',
    'জাফরি (শিয়া)',
    'যায়দী (শিয়া)'
  ];
}