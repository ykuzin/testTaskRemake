const { User, Withdraw } = require("/src/models");
async function withdraw(userId, value, client) {
  const withdraw = await Withdraw.create({ userId, value });

  const session = await client.startSession();
  session.startTransaction();
  try {
    const userBalanceUpdate = await User.findOneAndUpdate(
      {
        userId: userId,
        balance: { $gte: value },
      },
      {
        balance: { $dec: value },
      },
      {
        session,
      }
    );
    if (!userBalanceUpdate) throw new Error("Not Enough balance");

    await Withdraw.findOneAndUpdate(
      {
        _id: withdraw._id,
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
    await withdraw.findOneAndUpdate(
      {
        _id: withdraw._id,
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

module.exports = withdraw;
