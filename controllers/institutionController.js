import Institution from '../models/Institution.js';

export const getAllInstitutions = async (req, res) => {
  const institutions = await Institution.find();
  res.json(institutions);
};

export const createInstitution = async (req, res) => {
  const { institutionId, institutionName, ...otherDetails } = req.body;

  const institution = new Institution({ institutionId, institutionName, ...otherDetails });
  await institution.save();
  res.json({ message: 'Institution created', institution });
};
