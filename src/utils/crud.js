import { messageLogger } from './loggers';
import { Responses } from './responses';

export const getOne = model => async (request, response) => {
  try {
    const doc = await model.findOne({ _id: request.params.id }).lean().exec();

    if (!doc) {
      return response.status(404).end({ ...Responses.notFound });
    }

    return response.status(200).json({ ...Responses.success, data: doc });
  } catch (e) {
    messageLogger.error(e.message);
    return response.status(400).end({ ...Responses.error });
  }
};

export const getMany = model => async (request, response) => {
  try {
    const docs = await model.find().lean().exec();

    return response.status(200).json({ ...Responses.success, data: docs });
  } catch (e) {
    messageLogger.error(e.message);
    return response.status(400).end({ ...Responses.error });
  }
};

export const createOne = model => async (request, response) => {
  try {
    const doc = await model.create({ ...request.body });
    return response.status(201).json({ ...Responses.success, data: doc });
  } catch (e) {
    messageLogger.error(e.message);
    return response.status(400).end({ ...Responses.error });
  }
};

export const updateOne = model => async (request, response) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: request.params.id,
        },
        request.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      return response.status(404).end({ ...Responses.notFound });
    }

    return response
      .status(200)
      .json({ ...Responses.success, data: updatedDoc });
  } catch (e) {
    messageLogger.error(e.message);
    return response.status(400).end({ ...Responses.error });
  }
};

export const removeOne = model => async (request, response) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: request.params.id,
    });

    if (!removed) {
      return response.status(404).end({ ...Responses.notFound });
    }

    return response.status(200).json({ ...Responses.success, data: removed });
  } catch (e) {
    messageLogger.error(e.message);
    return response.status(400).end({ ...Responses.error });
  }
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
