const { User, Replenish } = require("/src/models");
async function replenish(userId, value, client) {
  const replenish = await Replenish.create({ userId, value });

  const session = await client.startSession();
  session.startTransaction();
  try {
    const userBalanceUpdate = await User.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        balance: { $inc: value },
      },
      {
        session,
      }
    );
    if (!userBalanceUpdate) throw new Error("Not Enough balance");

    await Replenish.findOneAndUpdate(
      {
        _id: replenish._id,
      },
      {
        status: "Passed",
      },
      {
        session,
      }
    );

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    await replenish.findOneAndUpdate(
      {
        _id: replenish._id,
      },
      {
        status: "Failed",
      }
    );
    throw e;
  } finally {
    session.close();
  }
}

module.exports = replenish;
