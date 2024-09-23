import { query } from "express";
import { Job } from "../Models/job.model.js";


// Admin Post Karega Job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body
        const userId = req.id;



        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId) {
            return res.status(400).json({
                message: "Someting is missing",
                succes: false
            })
        }




        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            message: "New Job Created successfully",
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// Get All Jobs For Student

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 })


        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// Get Job by Id For Students

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// Admin kitne job create kara abhi tak

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id

        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}