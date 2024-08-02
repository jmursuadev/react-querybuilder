import { Combinator, formatQuery } from 'react-querybuilder';
import { RuleGroupTypeAny } from 'react-querybuilder';

class FormatterQuery {
  rqbQuery: RuleGroupTypeAny;
  groupRules: any[];

  constructor(rqbQuery: RuleGroupTypeAny) {
    this.rqbQuery = rqbQuery;
    this.groupRules = JSON.parse(formatQuery(rqbQuery, 'json_without_ids')).rules;
  }

  encloseCondition(rules: string, combinator: string) {
    return `${combinator}(${rules})`;
  }

  encloseFinalCondition(rules: string) {
    return rules ? `or=(${rules})` : '';
  }

  encodeRule(rule: any, insideCombinator: boolean = false) {
    let value;

    switch (rule.operator) {
      case 'beginsWith':
        value = `like.${rule.value}*`;
        break;
      case 'endsWith':
        value = `like.*${rule.value}`;
        break;
      case 'contains':
        value = `cs.${rule.value}`;
        break;
      case 'in':
        const values = rule.value
          .split(', ')
          .map((v: any) => v.trim())
          .join(',');
        value = `in.(${values})`;
        break;
      case '>':
        value = `gt.${rule.value}`;
        break;
      case '=':
        value = `eq.${rule.value}`;
        break;
      case 'is':
        value = `is.${rule.value}`;
        break;
      case 'between':
        const [start, end] = rule.value.split(',');
        value = `gte.${start},${rule.field}.lte.${end}`;
        break;
      default:
        return '';
    }

    return [rule.field, value].join('.');
  }

  processGroup(rules: any, level: number = 0) {
    const conditions = {
      andConditions: [],
      orConditions: [],
    } as {
      [key: string]: string[];
    };

    rules.forEach((rule: any, i: number, values: any[]) => {
      // SKIP DO NOTHING
      if (typeof rule === 'string') {
        return;
      }

      const combi = typeof values[i - 1] === 'string' ? values[i - 1] : 'and';
      let value = '';
      if (rule.rules) {
        value = this.processGroup(rule.rules, level + 1);

        // first group rules must be enclosed with OR Combinator
        if (level === 0 && value) {
          value = this.encloseCondition(value, 'or');
        }
      } else if (rule) {
        value = this.encodeRule(rule);
      }

      if (value) {
        conditions[`${combi}Conditions`].push(value);
      }
    });

    const results = [];

    for (const key in conditions) {
      if (conditions[key].length > 0) {
        let condition = conditions[key].join(',');

        if (level > 0) {
          let combi = key.split('Conditions')[0]; // and/or
          condition = this.encloseCondition(condition, combi);
        }

        results.push(condition);
      }
    }

    // make sure to return only non-empty results
    return results.filter(v => v).join(',');
  }

  process() {
    return this.encloseFinalCondition(this.processGroup(this.groupRules));
  }
}

const formatQueryToPostgrest = (query: any) => {
  const formatter = new FormatterQuery(query);
  return formatter.process();
};

export { formatQueryToPostgrest };
