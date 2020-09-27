const { User, Transfer } = require("/src/models");

async function transfer(from, to, value, client) {
  const transfer = await Transfer.create({ from, to, value });

  const session = await client.startSession();
  session.startTransaction();
  try {
    const userBalanceUpdate1 = await User.findOneAndUpdate(
      {
        userId: from,
        balance: { $gte: value },
      },
      {
        balance: { $dec: value },
      },
      {
        session,
      }
    );

    if (!userBalanceUpdate1) throw new Error("Not Enough balance");

    const userBalanceUpdate2 = await User.findOneAndUpdate(
      {
        userId: to,
      },
      {
        balance: { $inc: value },
      },
      {
        session,
      }
    );
    if (!userBalanceUpdate2) throw new Error("User not found");

    await Transfer.findOneAndUpdate(
      {
        _id: transfer._id,
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
    await transfer.findOneAndUpdate(
      {
        _id: transfer._id,
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

module.exports = transfer;
