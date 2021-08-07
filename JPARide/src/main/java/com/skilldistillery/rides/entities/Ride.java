package com.skilldistillery.rides.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ride {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="trail_name")
	private String trailName;
	@Column(name="trail_length")
	private String trailLength;
	@Column(name="bike")
	private String bike;
	@Column(name="difficulty")
	private String difficulty;
	@Column(name="trail_type")
	private String trailType;
	
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTrailName() {
		return trailName;
	}
	public void setTrailName(String trailName) {
		this.trailName = trailName;
	}
	public String getTrailLength() {
		return trailLength;
	}
	public void setTrailLength(String trailLength) {
		this.trailLength = trailLength;
	}
	public String getBike() {
		return bike;
	}
	public void setBike(String bike) {
		this.bike = bike;
	}
	public String getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public String getTrailType() {
		return trailType;
	}
	public void setTrailType(String trailType) {
		this.trailType = trailType;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ride other = (Ride) obj;
		if (id != other.id)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Ride [id=" + id + ", trailName=" + trailName + ", trailLength=" + trailLength + ", bike=" + bike
				+ ", difficulty=" + difficulty + ", type=" + trailType + "]";
	}
	

}
