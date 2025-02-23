<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bio extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'status', 'type', 'bio_profile', 'user_id'];

  /**
   * The tags that belong to the bio.
   */
  public function tags()
  {
    return $this->belongsToMany(Tag::class);
  }

  /**
   * Get the general sections for the bio.
   */
  public function generalSection()
  {
    return $this->hasOne(GeneralSection::class);
  }
  public function locationSection()
  {
    return $this->hasOne(LocationSection::class);
  }
  public function educationSection()
  {
    return $this->hasOne(EducationSection::class);
  }
  public function personalDetails()
  {
    return $this->hasOne(PersonalDetails::class);
  }
  public function  familyInfoSection()
  {
    return $this->hasOne(FamilyInfoSection::class);
  }

  public function  professionSection()
  {
    return $this->hasOne(ProfessionSection::class);
  }

  public function  expectedPartner()
  {
    return $this->hasOne(ExpectedPartner::class);
  }


  public function  religiousActivity()
  {
    return $this->hasOne(ReligiousActivity::class);
  }
  public function  marriageInfo()
  {
    return $this->hasOne(MarriageInfo::class);
  }
  public function  hiddenInfo()
  {
    return $this->hasOne(HiddenInfo::class);
  }

  public function  filledMarks()
  {
    return $this->hasOne(FilledMarks::class);
  }
}