import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AutoIncrement,
  Validate,
} from 'sequelize-typescript';

@Table
export class SME extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Validate({
    notEmpty: {
      msg: 'UEN Number should not be empty',
    },
    is: {
      msg: 'UEN Number should have 8 digits followed by a alphabet',
      args: /\d{8}[A-za-z]{1}/i,
    },
  })
  @Column(
    DataType.CHAR({
      length: 9,
    }),
  )
  UEN: number;

  @Validate({
    notEmpty: {
      msg: 'Company Name should not be empty',
    },
  })
  @Column
  CompanyName: string;

  @Validate({
    notEmpty: {
      msg: 'Full Name should not be empty',
    },
  })
  @Column
  FullName: string;

  @Validate({
    notEmpty: {
      msg: 'Position in company should not be empty',
    },
  })
  @Column
  PositionInCompany: string;

  @Validate({
    isEmail: {
      msg: 'Email is not valid',
    },
    notEmpty: {
      msg: 'Email should not be empty',
    },
  })
  @Column
  Email: string;

  @Validate({
    len: {
      args: [11, 11],
      msg: 'Mobile Number should be of 11 digits',
    },
    notEmpty: true,
    isNumeric: true,
    is: {
      msg: 'Mobile Number should be a valid singapore number',
      args: /\+65(6|8|9)\d{7}/g,
    },
  })
  @Column(
    DataType.CHAR({
      length: 11,
    }),
  )
  MobNumber: number;

  @Validate({
    isArray: {
      args: true,
      msg: 'Documents is not valid',
    },
  })
  @Column(DataType.ARRAY(DataType.TEXT))
  Documents: string[];
}
