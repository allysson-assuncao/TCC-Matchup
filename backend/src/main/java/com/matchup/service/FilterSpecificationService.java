package com.matchup.service;

import com.matchup.dto.RequestDto;
import com.matchup.dto.SearchRequestDto;
import com.matchup.enums.LocalOperator;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*@Service
public class FilterSpecificationService<T> {
    public Specification<T> getSearchSpecification(List<SearchRequestDto> searchRequestDtos, RequestDto.GlobalOperator globalOperator){
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            for(SearchRequestDto requestDto: searchRequestDtos){
                for(String value: requestDto.getValues()){
                    Predicate predicate = null;
                    switch (requestDto.getOperation()){
                        case EQUAL -> predicate  = criteriaBuilder.equal(root.get(requestDto.getColumn()), value);
                        case LIKE -> predicate  = criteriaBuilder.like(root.get(requestDto.getColumn()), "%"+value+"%");
                        //case IN -> predicate  = criteriaBuilder.in(root.get(requestDto.getColumn()), requestDto.getValue());
                        case LOWER_THAN -> predicate  = criteriaBuilder.lessThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case GREATER_THAN -> predicate  = criteriaBuilder.greaterThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case JOIN -> predicate  = criteriaBuilder.equal(root.join(requestDto.getJoinTable()).get(requestDto.getColumn()), value);
                        default -> throw new IllegalStateException("Invalid Operation");
                    }
                    predicates.add(predicate);
                }
            }


            if(globalOperator.equals(RequestDto.GlobalOperator.AND)){
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }else if (globalOperator.equals(RequestDto.GlobalOperator.OR)){
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }else{
                throw new IllegalArgumentException("Invalid Global Operator");
            }
        };

    }
}*/

@Service
public class FilterSpecificationService<T> {
    public Specification<T> getSearchSpecification(List<SearchRequestDto> searchRequestDtos){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            for(SearchRequestDto requestDto: searchRequestDtos){
                List<Predicate> tempPredicates = new ArrayList<>();
                for(String value: requestDto.getValues()){
                    Predicate predicate = null;
                    switch (requestDto.getOperation()){
                        case EQUAL -> predicate  = criteriaBuilder.equal(root.get(requestDto.getColumn()), value);
                        case LIKE -> predicate  = criteriaBuilder.like(root.get(requestDto.getColumn()), "%"+value+"%");
                        case LOWER_THAN -> predicate  = criteriaBuilder.lessThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case GREATER_THAN -> predicate  = criteriaBuilder.greaterThanOrEqualTo(root.get(requestDto.getColumn()), value);
                        case JOIN -> predicate  = criteriaBuilder.equal(root.join(requestDto.getJoinTable()).get(requestDto.getColumn()), value);
                        default -> throw new IllegalStateException("Invalid Operation");
                    }
                    tempPredicates.add(predicate);
                }
                if(requestDto.getOperator().equals(LocalOperator.AND)){
                    predicates.add(criteriaBuilder.and(tempPredicates.toArray(new Predicate[0])));
                }else if (requestDto.getOperator().equals(LocalOperator.OR)){
                    predicates.add(criteriaBuilder.or(tempPredicates.toArray(new Predicate[0])));
                }else{
                    throw new IllegalArgumentException("Invalid Operator");
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

/*{
    "searchRequestDto": [
        {
            "column": "name",
            "values": nameTxt,
            "operation": "LIKE",
            "operator": "AND"
        },
        {
            "column": "id",
            "values": genresList,
            "joinTable": "genres",
            "operation": "JOIN",
            "operator": "OR"
        },
        {
            "column": "id",
            "values": subgenresList,
            "joinTable": "subGenres",
            "operation": "JOIN",
            "operator": "AND"
        },
        {
            "column": "id",
            "values": subtitleLanguagesList,
            "joinTable": "subtitleLanguages",
            "operation": "JOIN",
            "operator": "OR"
        },
        {
            "column": "id",
            "values": dubbingLanguagesList,
            "joinTable": "dubbingLanguages",
            "operation": "JOIN",
            "operator": "AND"
        },
        {
            "column": "id",
            "values": companyList,
            "joinTable": "company",
            "operation": "JOIN",
            "operator": "OR"
        },
        {
            "column": "id",
            "values": ageRatingList,
            "joinTable": "ageRating",
            "operation": "JOIN",
            "operator": "AND"
        }
    ]
}
*/
