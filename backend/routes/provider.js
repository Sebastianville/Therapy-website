import { Router } from "express";
import Provider from "../models/provider.js"

export const providerRouter = new Router()

//Get all providers
providerRouter.get('/', async (req, res, next) => {
    try {
        const providers = await Provider.find()
        res.status(200).json(providers)
    } catch (error) {
        next(error)
    }
});

//GET proivder by ID
providerRouter.get('/:id', async (req, res, next) => {
    try {
        const provider = await Provider.find()
        if (!provider) return res.status(404).send("provider not found")
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
});

// Create a new user
providerRouter.post("/", async (req, res, next) => {
    try {
      const newProvider = await Provider.create(req.body)
      res.status(201).json(newProvider)
    } catch (error) {
      next(error)
    }
});

// Delete user by ID
providerRouter.delete("/:id", async (req, res, next) => {
    try {
      const deletedProvider = await Provider.findByIdAndDelete(req.params.id)
      if (!deletedProvider) return res.status(404).send("Provider not found")
      res.status(204).send("Deleted Successfully")
    } catch (error) {
      next(error)
    }
});

// Patch route to update provider details by ID
providerRouter.patch("/:id", async (req, res, next) => {
    try {
      const provider = await Provider.findById(req.params.id);
      if (!provider) {
        return res.status(404).send("Provider not found");
      }
  
      if (req.body.first_name) {
        provider.first_name = req.body.first_name
      }
  
      if (req.body.last_name) {
        provider.last_name = req.body.last_name
      }
  
      if (req.body.specality) {
        // provider.specality = [...provider.specality, ...req.body.specality]
        //!using the spread operator and set ensures that the old array and the new array do not contian duplicates. Remember in Python that sets have unique values unlike a list
        provider.specality = [...new Set([...provider.specality, ...req.body.specality])];
      }
  
      if (req.body.languages) {
        // provider.languages = [...provider.languages, ...req.body.languages]
        //!using the spread operator and set ensures that the old array and the new array do not contian duplicates
        provider.languages = [...new Set([...provider.languages, ...req.body.languages])];
      }
  
      // updating the exisiting insurance information and pushing it
      if (req.body.insurance) {
        provider.insurance.push(...req.body.insurance) 
      }
  
      if (req.body.contact) {
        // Two ifs because they can either update one or the other or both but want to give option
        if (req.body.contact.phone) {
          provider.contact.phone = req.body.contact.phone
        }
        if (req.body.contact.email) {
          provider.contact.email = req.body.contact.email
        }
      }
  
      await provider.save()
      res.status(200).json(provider)
    } catch (error) {
      next(error)
    }
  });